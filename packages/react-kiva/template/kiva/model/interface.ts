import {ISoulAction, ISoulModel} from "../soul";

export interface IModelDispatch<P = any> {
    (action: ISoulAction<P>, afterCallback?: () => void): void
}

export interface IModelContext<S = any, P = any> {
    state: S,
    dispatch: IModelDispatch<P>
}

export interface IModelReducer<S> {
    (state: S, action: ISoulAction): S
}

interface IModelActionSaga {
    put: IModelDispatch,
    take: (action: ISoulAction) => Promise<any>
}

export interface IModelActionTask<S> {
    (saga: IModelActionSaga, action: ISoulAction, getState: () => S): Promise<any>
}

export interface IModel<S = any> extends Omit<ISoulModel<S>, "namespace"> {
    action?: {[key: string]: IModelActionTask<S>},
}
