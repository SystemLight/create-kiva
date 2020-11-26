import React, {ComponentType, useCallback, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Spin} from "antd";
import styled from "styled-components";

import {IRoutes, IRoutesContent, IChangeRouteCallback, ISubscription, IPlugin} from "./interface";

/*
    监听路由变化
 */
export function useChangeRoute(callback: IChangeRouteCallback) {
    const location = useLocation();
    useEffect(function() {
        callback(location);
    }, [callback, location]);
}

/*
    创建路由订阅顶级组件
 */
export function createSubscription(subscription: ISubscription): ComponentType {
    return (props: any) => {
        const dispatch = useDispatch();

        const callback: IChangeRouteCallback = useCallback(({pathname}) => {
            const cb = subscription[pathname];
            cb && cb(dispatch, pathname);

            const cb2 = subscription["*"];
            cb2 && cb2(dispatch, pathname);
        }, [dispatch]);

        useChangeRoute(callback);

        return (
            <div {...props} />
        );
    };
}

/*
    加载组件包裹器
 */
export const SpinWrap = styled.div`
    text-align: center;
    border-radius: 4px;
    padding: 30px 50px;
    overflow: hidden;
`;

/*
    高阶组件，用于异步加载组件，这样可以让不同路由地址的组件分开加载，
    当导出组件设置access参数时将升级组件为鉴权组件
 */
export function dynamic(factory: () => Promise<{default: any}>): ComponentType {
    const _factory = () => {
        return factory().then((data) => {
            let resultData = data;
            for (const key of Object.keys(data.default)) {
                resultData = meta.plugins[key](resultData.default, data.default[key], data.default);
            }
            return resultData;
        });
    };
    return () => (
        <React.Suspense fallback={<SpinWrap><Spin size="large" tip={"加载中..."} /></SpinWrap>}>
            {React.createElement(React.lazy(_factory))}
        </React.Suspense>
    );
}

class MetaMiddleware {
    public plugins: {[key: string]: IPlugin} = {};

    public use<P = any>(key: string, plugin: IPlugin<P>) {
        this.plugins[key] = plugin;
        return this;
    }
}

const meta = new MetaMiddleware();
dynamic.meta = meta;

/*
    路由查询器
 */
export class QueryRoute {
    private __cacheRoute = new Map<string, IRoutes>();

    constructor(public readonly routes: IRoutes) {
    }

    findSubRoute(_routes: IRoutes, routeKey: string): IRoutes {
        const result = _routes.find((p) => p.key === routeKey);
        return result ? (result.subRoute || []) : [];
    };

    findRoute(findKey: string): IRoutes {
        let rootRoutes: IRoutes = this.routes;
        for (const p of findKey.split("/")) {
            rootRoutes = this.findSubRoute(rootRoutes, p);
            if (!rootRoutes.length) {
                break;
            }
        }
        this.__cacheRoute.set(findKey, rootRoutes);
        return rootRoutes;
    }

    getCacheRoute(findKey: string) {
        return this.__cacheRoute.get(findKey);
    }

    getRoute(findKey: string): IRoutes {
        const cacheRoutes = this.getCacheRoute(findKey);
        if (cacheRoutes) {
            return cacheRoutes;
        }
        return this.findRoute(findKey);
    };

    unshift(findKey: string, routeContent: IRoutesContent) {
        const routes = this.getRoute(findKey);
        routes.unshift(routeContent);
        return routes;
    }

    push(findKey: string, routeContent: IRoutesContent) {
        const routes = this.getRoute(findKey);
        routes.push(routeContent);
        return routes;
    }
}
