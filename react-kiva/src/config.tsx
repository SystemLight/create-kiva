import React from "react";
import {message} from "antd";
import {CrownOutlined} from "@ant-design/icons";

import {
    IRequestConfig, globalRequestConfig,
    IDispatch, INavData, R404Page, QueryRoute,
    createSubscription, soul, access, dynamic
} from "kiva";
import {useTab} from "@@/utils";

/*
    axios request全局配置项，
    axiosGlobalConfig配置适用于组件中的useRequest，
    globalRequestConfig配置适用于redux action中的request
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
    创建模型状态库，如果启用约定状态插件将会自动注册状态模型
 */
/* <AgreedModel> */
soul.register(require("@/models/access").default);
soul.register(require("@/models/common").default);
/* </AgreedModel> */
export const store = soul.createStore();

/*
    1. 约定式路由将按照views下的目录结构自动填写路由表
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
    注册路由页组件元信息处理插件，类型注入属性需要在custom.d.ts中声明类型
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
    创建订阅组件，该组件放置在Router组件之后，App组件之前，
    用于监听路由变化进行回调执行函数
 */
export const Subscription = createSubscription({
    "*": (dispatch: IDispatch) => {
        document.title = "后台管理系统";
        // 派发soul模型状态内置action，当路由切换时自动清理$开头的状态
        // dispatch({type: "@@clear"});
    }
});

/*
    主页导航栏结构树，快速配置通用左侧导航栏，并生成对应面包屑，
    key值必须与约定式路由中目录名结构一致，嵌套结构亦如此
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
