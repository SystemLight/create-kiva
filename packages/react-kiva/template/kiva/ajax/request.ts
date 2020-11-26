import axios, {AxiosResponse} from "axios";

import {IRequestConfig} from "./interface";

export const globalRequestConfig: IRequestConfig = {};

/*
    request是纯axios请求，无状态，当某个请求不需要组件销毁时自动取消请求，
    可以使用request，普遍适用于redux中的reducer，也可以在kiva/model中
    使用，model虽然不会取消请求但是会终止异步回调改变组件状态
 */
export function request({onError, ...axiosConfig}: IRequestConfig) {
    return new Promise<AxiosResponse>((resolve, reject) => {
        axios(Object.assign(globalRequestConfig, axiosConfig)).then((resp) => {
            resolve(resp);
        }).catch((e) => {
            onError ? onError(e) : (globalRequestConfig.onError && globalRequestConfig.onError(e));
            reject(e);
        });
    });
}
