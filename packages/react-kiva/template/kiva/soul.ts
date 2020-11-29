import {useCallback} from "react";
import {createStore, applyMiddleware, combineReducers, compose, ReducersMapObject, Action} from "redux";
import {useDispatch} from "react-redux";
import thunk, {ThunkDispatch} from "redux-thunk";

export interface ISoulAction<P = any> extends Action<string> {
    payload?: P
}

export type IDispatch<S = any, P = any> = ThunkDispatch<S, any, ISoulAction<P>>

interface ISoulDispatch<P = any> {
    (action: ISoulAction<P>, afterCallback?: () => void): void
}

export interface ISoulMutation<S> {
    (state: S, action: ISoulAction): S
}

export interface ISoulImmer<S> {
    (state: S, action: ISoulAction): void
}

interface ISoulActionSaga {
    put: IDispatch,
    take: (action: ISoulAction) => Promise<any>
}

export interface IActionTask<S> {
    (saga: ISoulActionSaga, action: ISoulAction, getState: () => S): Promise<any>
}

export interface ISoulModel<S = any> {
    namespace: string,
    state: S,
    mutation?: {[key: string]: ISoulMutation<S>},
    immer?: {[key: string]: ISoulImmer<S>},
    action?: {[key: string]: IActionTask<S>},
}

/*
    Soul模型状态提供了一个内置action，{type:"clear"}，
    该action应当注册到路由订阅中，即路由切换时派发该Action，
    这会让redux将所有命名$开头的状态字段清空，以$命名开头就意味着该状态并非
    需要长久保存，当clear触发时这些字段会被清理，最佳时机是路由切换时
 */
class Soul {
    public reducers: ReducersMapObject<any, ISoulAction> = {};
    public actions: {[key: string]: ISoulModel["action"]} = {};

    register<S>(model: ISoulModel<S>) {
        this.reducers[model.namespace] = function(state: S, action) {
            // 初始化状态对象
            if (state === undefined) {
                return {...model.state};
            }

            // 触发清理功能,dispatch({type:"@@clear"})，清除$命名开头的状态变量
            if (action.type === "@@clear") {
                Object.keys(state).forEach((k) => {
                    if (k.startsWith("$")) {
                        state[k as keyof S] = model.state[k as keyof S];
                    }
                });
                return {...state};
            }

            const actionPath = action.type.split("/");
            if (model.namespace === actionPath[0] && actionPath[1]) {
                // 触发payload合并状态内置功能
                if (actionPath[1] === "@@bind") {
                    return {...state, ...action.payload};
                }

                const mutation = model.mutation && model.mutation[actionPath[1]];
                if (mutation) {
                    return mutation(state, action);
                }

                const immer = model.immer && model.immer[actionPath[1]];
                if (immer) {
                    immer(state, action);
                    return {...state};
                }

                throw new TypeError(`No distribution ${action.type}`);
            }

            return state;
        };
        this.actions[model.namespace] = model.action;
    }

    findAction<S = any>(type: string): IActionTask<S> | null {
        const [namespace, actionKey] = type.split("/");
        const actions = this.actions[namespace];
        if (!actions) {
            return null;
        }
        const action = actions[actionKey];
        if (!action) {
            return null;
        }
        return action;
    }

    createStore() {
        const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        return createStore(combineReducers(this.reducers), composeEnhancers(applyMiddleware(thunk)));
    }
}

// 整个项目只能有一个soul状态模型实例
export const soul = new Soul();

// 使用usePut代替react-redux的useDispatch
export function useSoulDispatch<S = any, Payload = any>(): ISoulDispatch<Payload> {
    const _dispatch = useDispatch<IDispatch>();
    return useCallback(function(action, afterCallback) {
        _dispatch(function(thunkDispatch, getState) {
            async function take(takeAction: ISoulAction) {
                const takeActionTask = soul.findAction(takeAction.type);
                if (takeActionTask) {
                    await takeActionTask({put: thunkDispatch, take: take}, takeAction, getState);
                }
            }

            const actionTask = soul.findAction(action.type);
            if (actionTask) {
                actionTask({put: thunkDispatch, take: take}, action, getState).then(afterCallback);
            } else {
                _dispatch(action);
                afterCallback && afterCallback();
            }
        });
    }, [_dispatch]);
}

// 用于状态模型中的action延时
export function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(function() {
            resolve(null);
        }, ms);
    });
}
