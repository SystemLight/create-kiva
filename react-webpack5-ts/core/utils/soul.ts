import {Action, applyMiddleware, combineReducers, createStore, ReducersMapObject} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";

export type ISoulDispatch<T> = ThunkDispatch<T, any, ISoulActionContent>

export interface ISoulActionContent extends Action<string> {
    payload?: {[key: string]: any}
}

export interface ISoulMutation<S> {
    [key: string]: (state: S, action: ISoulActionContent) => S
}

export interface ISoulModel<S> {
    namespace: string,
    states: S,
    mutation: ISoulMutation<S>,
}

export class Soul {
    public reducers: ReducersMapObject<any, ISoulActionContent> = {};

    register<S>(model: ISoulModel<S>) {
        this.reducers[model.namespace] = function(state: S, action) {
            if (state === undefined) {
                return model.states || {};
            }

            const actionPath = action.type.split("/");
            if (model.namespace === actionPath[0] && actionPath[1]) {
                const mutation = model.mutation[actionPath[1]];
                if (mutation) {
                    return mutation(state, action);
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

export const soul = new Soul();
