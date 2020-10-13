import React, {useEffect, useRef, useState, useContext, PropsWithChildren} from "react";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const Context = React.createContext<IUseAxiosConfig>({});

export interface IUseAxiosConfig {
    jsonType?: boolean,
    errorHandler?: (e: any) => void,
    config?: AxiosRequestConfig
}

/*
    通过UesAxiosConfig可以配置useAxios钩子函数全局配置项
 */
export function UesAxiosConfig({value, children}: PropsWithChildren<{value: IUseAxiosConfig}>) {
    return React.createElement(Context.Provider, {value},
        React.createElement(React.Fragment, null, children)
    );
}

export interface IUseAxiosLocalConfig<T> extends IUseAxiosConfig {
    service: (req: AxiosInstance) => Promise<T>,
}

/*
    useAxios提供组件销毁自动取消请求，错误公共处理和私有处理，loading，error状态返回，
    不建议使用Axios钩子，虽然该hooks可以很轻松的在组件中完成请求，但是这样无疑将状态数据和组件耦合在
    一起，更多时候建议使用redux处理并保存全局状态，分离组件交互和业务数据，并由thunk，saga等来处理异步action
 */
export function useAxios<T>(
    {
        service, errorHandler: _errorHandler, jsonType: _jsonType, config: _config
    }: IUseAxiosLocalConfig<T>
) {
    const {errorHandler, jsonType, config} = useContext(Context);
    const {current: source} = useRef(axios.CancelToken.source());
    useEffect(() => () => source.cancel("Destroy the component, cancel the request"), []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const req = axios.create({
        cancelToken: source.token,
        headers: _jsonType ? {
            "Content-Type": "application/json;charset=UTF-8"
        } : jsonType,
        ...config,
        ..._config
    });

    const run = (): Promise<T> => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            service(req).then((content) => {
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
    };

    return {run, loading, error};
}
