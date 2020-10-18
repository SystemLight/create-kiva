import React, {useEffect, useRef, useState, useContext, PropsWithChildren, useCallback, useMemo} from "react";
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export interface IAxiosRequestConfig extends AxiosRequestConfig {
    onError?: (e: any) => void
}

export const globalRequestConfig: IAxiosRequestConfig = {};

/*
    request适用于redux的model中，组件中ajax请求适用useAxios，该hooks会在组件销毁时自动取消请求，同时支持全局配置
 */
export function request({onError, ...axiosConfig}: IAxiosRequestConfig) {
    return new Promise<AxiosResponse>((resolve, reject) => {
        axios(Object.assign(globalRequestConfig, axiosConfig)).then((resp) => {
            resolve(resp);
        }).catch((e) => {
            onError ? onError(e) : (globalRequestConfig.onError && globalRequestConfig.onError(e));
            reject(e);
        });
    });
}

const Context = React.createContext<IUseAxiosConfig>({});

export interface IUseAxiosConfig {
    errorHandler?: (e: any) => void,
    config?: AxiosRequestConfig,
}

/*
    通过UesAxiosConfig可以配置useAxios钩子函数全局配置项
 */
export function UseAxiosConfig({value, children}: PropsWithChildren<{value: IUseAxiosConfig}>) {
    return React.createElement(Context.Provider, {value},
        React.createElement(React.Fragment, null, children)
    );
}

export interface IUseAxiosLocalConfig<T> extends IUseAxiosConfig {
    auto?: boolean,
    service: (req: AxiosInstance, runArgs: any[]) => Promise<T>,
}

/*
    useAxios提供组件销毁自动取消请求，错误公共处理和私有处理，loading，error状态返回，
    不建议使用Axios钩子，虽然该hooks可以很轻松的在组件中完成请求，但是这样无疑将状态数据和组件耦合在
    一起，更多时候建议使用redux处理并保存全局状态，分离组件交互和业务数据，并由thunk，saga等来处理异步action
 */
export function useAxios<T>(
    {
        service, auto, errorHandler: _errorHandler, config: _config
    }: IUseAxiosLocalConfig<T>
) {
    const {errorHandler, config} = useContext(Context);
    const {current: source} = useRef(axios.CancelToken.source());

    const req = useMemo(function() {
        return axios.create({cancelToken: source.token, ...config, ..._config});
    }, [source.token, config, _config]);

    const run = useCallback(function(...args: any[]): Promise<T> {
        setLoading(true);
        return new Promise((resolve, reject) => {
            service(req, args).then((content) => {
                setLoading(false);
                resolve(content);
            }).catch((e) => {
                if (!axios.isCancel(e)) {
                    setLoading(false);
                    setError(true);
                    _errorHandler ? _errorHandler(e) : (errorHandler && errorHandler(e));
                }
                reject(e);
            });
        });
    }, [_errorHandler, errorHandler, req, service]);

    useEffect(() => {
        auto && run().then();
        return () => source.cancel("Destroy the component, cancel the request");
    }, []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    return {run, loading, error};
}
