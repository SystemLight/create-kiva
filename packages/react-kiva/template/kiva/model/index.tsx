import React, {ComponentType, FunctionComponent, useCallback, useContext, useEffect, useReducer, useRef} from "react";

import {ISoulAction} from "../soul";
import {IModelContext, IModelReducer, IModel} from "./interface";

const Context = React.createContext<IModelContext>({} as any);

export function useModel<S = any, P = any>() {
    return useContext<IModelContext<S, P>>(Context);
}

// 注意：这是一个危险方法传入stateData如果状态改变就会触发重新派发，这种绑定是单向的
// 请注意传入内容是否真的具有memo机制，而不是每次render都重新传入新对象，
// stateData需要如同useState的返回值一样特征，你可以通过useMemo包裹返回值实现这样的自定义hooks
export function useBindModel<S>(key: string, stateData: S) {
    const {state, dispatch} = useModel();

    useEffect(() => {
        dispatch({type: "@@bind", payload: {[key]: stateData}});
    }, [stateData]);

    return state[key];
}

/*
    注意：局部状态数据模型model进行嵌套是非常糟糕的设计，会造成不可预知的问题，
    它通常应用于路由页面入口位置组件
 */
export function model<S = any>(stateModel: IModel<S>) {
    const reducer: IModelReducer<S> = function(state, action) {
        const {type} = action;

        if (type === "@@bind") {
            return {...state, ...action.payload};
        }

        const mutation = stateModel.mutation && stateModel.mutation[type];
        if (mutation) {
            return mutation(state, action);
        }

        const immer = stateModel.immer && stateModel.immer[type];
        if (immer) {
            immer(state, action);
            return {...state};
        }

        throw new TypeError(`No distribution ${action.type}`);
    };

    return <P extends {}>(Component: ComponentType<P>): FunctionComponent<P> => (props) => {
        const source = useRef(false);

        const [state, dispatch] = useReducer(reducer, {...stateModel.state});
        const getState = useCallback(() => state, [state]);

        useEffect(() => () => {
            source.current = true;
        }, []);

        const put = useCallback(function(action, afterCallback) {
            if (source.current) {
                return;
            }

            dispatch(action);
            afterCallback && afterCallback();
        }, [dispatch]);

        const take = useCallback(async function(takeAction: ISoulAction) {
            if (source.current) {
                return;
            }

            const {type} = takeAction;
            const takeActionTask = stateModel.action && stateModel.action[type];
            if (takeActionTask) {
                await takeActionTask({put, take}, takeAction, getState);
            }
        }, [getState, put]);

        const _dispatch = useCallback(function(action: ISoulAction, afterCallback?: () => void) {
            if (source.current) {
                return;
            }

            const {type} = action;

            if (type === "@@bind") {
                dispatch(action);
                return;
            }

            const actionTask = stateModel.action && stateModel.action[type];
            if (actionTask) {
                actionTask({put, take}, action, getState).then(afterCallback);
            } else {
                dispatch(action);
                afterCallback && afterCallback();
            }
        }, [put, take, getState]);

        return (
            <Context.Provider value={{state: state, dispatch: _dispatch}}>
                <Component {...props} />
            </Context.Provider>
        );
    };
}

export * from "./interface";
