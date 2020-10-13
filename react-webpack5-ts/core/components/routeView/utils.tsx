import React, {ComponentType, useCallback, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Spin} from "antd";
import styled from "styled-components";

import {IRoutes, IChangeRouteCallback} from "./interface";
import {Dispatch} from "redux";

/*
    监听路由变化
 */
export function useChangeRoute(callback: IChangeRouteCallback) {
    const location = useLocation();
    useEffect(function() {
        callback(location);
    }, [callback, location]);
}

interface ISubscription {
    [key: string]: (dispatch: Dispatch<any>) => void
}

export function createSubscription(subscription: ISubscription): ComponentType {
    return (props) => {
        const dispatch = useDispatch();

        const callback: IChangeRouteCallback = useCallback(({pathname}) => {
            const cb = subscription[pathname];
            cb && cb(dispatch);
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
    高阶组件，用于异步加载组件，这样可以让不同路由地址的组件分开加载
 */
export function dynamic(factory: () => Promise<{default: any}>): ComponentType {
    return () => (
        <React.Suspense fallback={<SpinWrap><Spin size="large" tip={"加载中..."} /></SpinWrap>}>
            {React.createElement(React.lazy(factory))}
        </React.Suspense>
    );
}

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
        for (const p of findKey.split(".")) {
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
}
