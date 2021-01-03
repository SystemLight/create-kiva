import {IGlobalState} from "./global";

export interface ILoadingState {
    global: boolean,
    effects: {[key: string]: boolean | undefined},
    models: {
        global?: boolean,
    },
}

export interface IStates {
    loading: ILoadingState,
    global: IGlobalState,
}
