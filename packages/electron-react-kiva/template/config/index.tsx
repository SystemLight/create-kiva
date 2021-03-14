import React from "react";
import {message} from "antd";

import {
    IRequestConfig, globalRequestConfig,
    IDispatch, R404Page, QueryRoute,
    createSubscription, access, dynamic
} from "kiva";
import {useTab} from "@/utils/tabs";

/*
    网络请求全局配置
 */
const baseURL = process.env.NODE_ENV === "development" ? "/proxy/api" : "/api";

export const axiosGlobalConfig: IRequestConfig = {
    baseURL: baseURL,
    onError(e) {
        message.error("请求失败").then();
    }
};

globalRequestConfig.baseURL = baseURL;
globalRequestConfig.onError = () => {
    message.error("请求失败").then();
};

/*
    路由全局配置
    1. 自动路由将按照views下的目录结构自动填写路由表
    2. 默认启用，通过webpack.config.js配置
    3. 启用后AgreedRouting标签中内容将会自动填写路由表
 */
export const qr = new QueryRoute([
    /* <AgreedRouting> */
    {key: "admin",path: "/admin",component: dynamic(() => import(/* webpackChunkName: "admin" */"@@/admin")),subRoute: [{key: "trial",path: "/admin/trial",component: dynamic(() => import(/* webpackChunkName: "admin-trial" */"@@/admin/trial")),exact: true}],exact: false},
    /* </AgreedRouting> */
    {
        key: "notFound",
        path: ["*", "/404"],
        component: R404Page
    }
]);

/*
    路由变化订阅配置
 */
export const Subscription = createSubscription({
    "*": (dispatch: IDispatch) => {
        document.title = "后台管理系统";
        // 派发soul模型状态内置action，当路由切换时自动清理$开头的状态
        // dispatch({type: "@@clear"});
    }
});

/*
    路由处理中间策略注册配置，注册类型参考kiva-core.d.ts说明
 */
dynamic.meta.use("access", function(component, args) {
    return {default: access(...args)(component)};
}).use("title", function(component, args: string) {
    document.title = args;
    return {default: component};
}).use("tab", function(component, args: string) {
    return {
        default() {
            useTab(args);
            return React.createElement(component);
        }
    };
});
