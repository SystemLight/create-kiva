import React, {
    useEffect, useRef, useState, PropsWithChildren,
    useCallback, useContext
} from "react";
import axios, {AxiosRequestConfig} from "axios";

import {IRequestConfig, IRequestLocalConfig} from "./interface";

const Context = React.createContext<IRequestConfig>({});

export function UseAxiosConfig({value, children}: PropsWithChildren<{value: IRequestConfig}>) {
    return React.createElement(Context.Provider, {value},
        React.createElement(React.Fragment, null, children)
    );
}

export function useAxios<T>({service, auto, onError, ...axiosConfig}: IRequestLocalConfig<T>) {
    const globalConfig = useContext(Context);
    const sourceRef = useRef(axios.CancelToken.source());

    const reset = useCallback(function() {
        sourceRef.current = axios.CancelToken.source();
    }, []);

    function run(...args: any[]): Promise<T> {
        return new Promise((resolve, reject) => {
            service(
                axios.create({cancelToken: sourceRef.current.token, ...globalConfig, ...axiosConfig})
                , args
            ).then((content) => {
                resolve(content);
            }).catch((e) => {
                if (!axios.isCancel(e)) {
                    onError ? onError(e) : (globalConfig.onError && globalConfig.onError(e));
                }
                reject(e);
            });
        });
    }

    useEffect(() => {
        const s = sourceRef;
        auto && run().then();
        return () => s.current.cancel("Destroy the component, cancel the request");
    }, []);

    return {run, reset, sourceRef: sourceRef};
}

export function useRequest(config: string | AxiosRequestConfig, auto?: boolean) {
    const {run} = useAxios({auto: auto, service: (req) => req(config as string)});
    const [loading, setLoading] = useState(!!auto);

    const _req = function(...args: any[]) {
        !loading && setLoading(true);
        return run(...args).then((req) => {
            setLoading(false);
            return req;
        }).catch((e) => {
            setLoading(false);
            throw new Error(e);
        });
    };

    return {run: _req, loading};
}
