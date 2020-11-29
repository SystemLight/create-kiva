import React from "react";
import {message} from "antd";
import {CrownOutlined} from "@ant-design/icons";

import {
    IRequestConfig, globalRequestConfig,
    IDispatch, INavData, R404Page, QueryRoute,
    createSubscription, soul, access, dynamic
} from "kiva";
import {useTab} from "@/models/common/utils";

/*
    网络请求全局配置
 */
const baseURL = process.env.NODE_ENV === "development" ? "/proxy/api" : "/api";

export const axiosGlobalConfig: IRequestConfig = {
    baseURL: baseURL,
    onError(e) {
        message.error("请求失败");
    }
};

globalRequestConfig.baseURL = baseURL;
globalRequestConfig.onError = () => {
    message.error("请求失败");
};

/*
    数据状态模型全局配置
 */
/* <AgreedModel> */
soul.register(require("@/models/access").default);
soul.register(require("@/models/common").default);
/* </AgreedModel> */
export const store = soul.createStore();

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
    路由处理中间策略注册配置
 */
dynamic.meta.use("access", function(component, args) {
    return {default: access(...args)(component)};
}).use("title", function(component, args: string) {
    document.title = args;
    return {default: component};
}).use("tab", function(component, args: string) {
    return {
        default() {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useTab(args);
            return React.createElement(component);
        }
    };
});

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
    导航栏菜单对象配置
 */
export const navs: INavData[] = [
    {
        key: "admin",
        title: "管理",
        icon: <CrownOutlined />,
        items: [
            {
                key: "trial",
                title: "测试组件"
            }
        ]
    }
];
