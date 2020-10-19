import {Action, applyMiddleware, combineReducers, createStore, ReducersMapObject} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";

export type ISoulDispatch<S = any> = ThunkDispatch<S, any, ISoulActionContent>

export interface ISoulActionContent extends Action<string> {
    payload?: {[key: string]: any}
}

export interface ISoulMutation<S> {
    [key: string]: (state: S, action: ISoulActionContent) => S
}

export interface ISoulImmer<S> {
    [key: string]: (state: S, action: ISoulActionContent) => void
}

export interface ISoulModel<S> {
    namespace: string,
    state: Readonly<S>,
    mutation: ISoulMutation<S>,
    immer: ISoulImmer<S>,
}

/*
    Soul模型状态提供了一个内置action，{type:"$/clear"}，
    该action应当注册到路由订阅中，即路由切换时派发该Action，
    这会让redux将所有命名$开头的状态字段清空，以$命名开头就意味着该状态并非
    需要长久保存，当clear触发时这些字段会被清理，最佳时机是路由切换时
 */
export class Soul {
    public reducers: ReducersMapObject<any, ISoulActionContent> = {};

    register<S>(model: ISoulModel<S>) {
        this.reducers[model.namespace] = function(state: S, action): S {
            if (state === undefined) {
                return {...model.state};
            }

            if (action.type === "$/clear") {
                Object.keys(state).forEach((k) => {
                    if (k.startsWith("$")) {
                        state[k as keyof S] = model.state[k as keyof S];
                    }
                });
                return {...state};
            }

            const actionPath = action.type.split("/");
            if (model.namespace === actionPath[0] && actionPath[1]) {
                const mutation = model.mutation[actionPath[1]];
                const immer = model.immer[actionPath[1]];
                if (mutation) {
                    return mutation(state, action);
                } else if (immer) {
                    immer(state, action);
                    return {...state};
                } else {
                    throw new TypeError(`No distribution ${action.type}`);
                }
            }

            return state;
        };
    }

    createStore() {
        return createStore(combineReducers(this.reducers), applyMiddleware(thunk));
    }
}
