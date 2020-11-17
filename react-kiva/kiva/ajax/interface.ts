import {AxiosInstance, AxiosRequestConfig} from "axios";

export interface IRequestConfig extends AxiosRequestConfig {
    onError?: (e: any) => void
}

export interface IRequestLocalConfig<T> extends IRequestConfig {
    auto?: boolean,
    service: (req: AxiosInstance, runArgs: any[]) => Promise<T>,
}

export interface IUseRemoteStateOptions<S = any, SS = any> {
    auto?: boolean,
    autoInitExtra?: any[],
    key?: string,
    getConfig: string | AxiosRequestConfig | ((req: AxiosInstance, extra: any[]) => Promise<{data: any}>),
    setConfig?: string | AxiosRequestConfig | ((req: AxiosInstance, sState: SS, extra: any[]) => Promise<any>),
    setAfter?: (sData: any, sState: SS, extra: any[]) => false | any[],
    mapSetState?: (state: S) => void,
}

export type IUseRemoteStateResult<S, SS> = [
        S | null,
    (state: SS, extra?: any[]) => void,
    (extra?: any[]) => void,
    boolean,
]
