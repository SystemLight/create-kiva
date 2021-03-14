import {useCallback, useContext, useEffect, useRef} from "react";
import get from "lodash/get";

import {useImmerState} from "../useHooks";
import {useAxios, Context} from "./core";
import {IUseRemoteStateOptions, IUseRemoteStateResult} from "./interface";

interface IState<S> {
    data: S | null,
    loading: boolean,
}

/*
    基于useAxios的高级HOOKS，通过配置参数绑定远程数据，
    useRemoteState配置可以很简单，根据不通过场景也可以配置很复杂
 */
export function useRemoteState<S = any, SS = any>(options: IUseRemoteStateOptions<S, SS> | string): IUseRemoteStateResult<S, SS> {
    // 初始化传递options值
    if (typeof options === "string") {
        options = {getConfig: options};
    }
    const {getConfig, setConfig, setAfter, auto, autoInitExtra, key, mapSetState, onError} = options;
    const globalConfig = useContext(Context);

    const [state, setState] = useImmerState<IState<S>>({data: null, loading: !!auto});
    const loading = useRef(!!auto);

    const setLoading = useCallback(function(_loading: boolean) {
        loading.current = _loading;
        setState({loading: _loading});
    }, []);

    // 初始化请求器
    const {run: getRun} = useAxios({
        service(req, extra) {
            if (typeof getConfig === "function") {
                return getConfig(req, extra);
            } else if (typeof getConfig === "string") {
                return req(getConfig);
            } else {
                return req(getConfig);
            }
        },
        onError(e) {
            setState({loading: false});
            onError ? onError(e, "get") : (globalConfig.onError && globalConfig.onError(e));
        }
    });

    function getState(extra?: any[]) {
        if (!loading.current) {
            setLoading(true);
        }
        return getRun(...(extra ?? [])).then(({data}) => {
            data = key ? get(data, key) : data;
            setState({data, loading: false});
            loading.current = false;
            mapSetState && mapSetState(data);
            return data;
        });
    }

    const {run: setRun} = useAxios({
        async service(req, [data, extra]) {
            if (!setConfig) {
                return [data, extra];
            }
            if (typeof setConfig === "function") {
                return setConfig(req, data, extra);
            } else if (typeof setConfig === "string") {
                return req({url: setConfig, method: "POST", data: data});
            } else {
                return req({...setConfig, data: data});
            }
        },
        onError(e) {
            setState({loading: false});
            onError ? onError(e, "set") : (globalConfig.onError && globalConfig.onError(e));
        }
    });

    function _setState(sState: SS, extra?: any[]) {
        if (!loading.current) {
            setLoading(true);
        }
        return setRun(sState, extra ?? []).then((data: any) => {
            const toGet = setAfter && setAfter(data, sState, extra ?? []);
            if (toGet === false) {
                setLoading(false);
                return data;
            }
            return getState(toGet);
        });
    }

    useEffect(() => {
        auto && getState(autoInitExtra);
    }, []);

    return [state.data, _setState, getState, state.loading];
}
