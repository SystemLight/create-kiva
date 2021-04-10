import {Reducer, Effect, Subscription} from "umi";

export interface IDvaModel<S = any> {
    namespace: string,
    state: S,
    reducers?: {[key: string]: Reducer<S>},
    effects?: {[key: string]: Effect},
    subscriptions?: {[key: string]: Subscription},
}
