import React from "react";
import {message} from "antd";
import {TeamOutlined} from "@ant-design/icons";

import {
    IUseAxiosConfig, globalRequestConfig,
    ISoulDispatch, IRootNav, R404Page, IRoutes,
    QueryRoute, createSubscription, dynamic
} from "kiva";
import RootPage from "@p/index";
import soul from "@/models";

/*
    axios request全局配置项
 */
export const axiosGlobalConfig: IUseAxiosConfig = {
    config: {
        baseURL: "/proxy/api"
    },
    errorHandler(e) {
        message.error("全局处理，请求失败");
    }
};

globalRequestConfig.baseURL = "/proxy/api";
globalRequestConfig.onError = () => {
    message.error("全局处理，请求失败");
};

/*
    创建模型状态库
 */
export const store = soul.createStore();

/*
    1. 约定式路由将按照views下的目录结构自动填写路由表
    2. 默认启用，通过pages.config.js配置
    3. 启用后AgreedRouting标签中内容将会自动填写路由表
 */
export const routes: IRoutes = [
    {
        key: "$",
        path: "/",
        exact: false,
        component: RootPage,
        subRoute: [
            /* <AgreedRouting> */
            {key: "example",path: "/example",component: dynamic(() => import(/* webpackChunkName: "example" */"@p/example")),subRoute: [{key: "edittable",path: "/example/edittable",component: dynamic(() => import(/* webpackChunkName: "example-edittable" */"@p/example/edittable")),exact: true},{key: "my",path: "/example/my",component: dynamic(() => import(/* webpackChunkName: "example-my" */"@p/example/my")),exact: true},{key: "[users]",path: "/example/:users",component: dynamic(() => import(/* webpackChunkName: "example-[users]" */"@p/example/[users]")),exact: true}],exact: false},
            /* </AgreedRouting> */
        ]
    },
    {
        key: "notFound",
        path: ["*", "/404"],
        component: R404Page
    }
];

export const qr = new QueryRoute(routes);

/*
    创建订阅组件，该组件放置在Router组件之后，App组件之前，
    用于监听路由变化进行回调执行函数
 */
export const Subscription = createSubscription({
    "*": (dispatch: ISoulDispatch) => {
        // 派发soul模型状态内置action，当路由切换时自动清理$开头的状态
        dispatch({type: "$/clear"});
    }
});

/*
    主页导航栏结构树，快速配置通用左侧导航栏，并生成对应面包屑，
    key值必须与约定式路由中目录名结构一致，嵌套结构亦如此
 */
export const navs: IRootNav[] = [
    {
        key: "example",
        title: "举例",
        icon: <TeamOutlined />,
        items: [
            {
                key: "my",
                title: "我的",
                icon: <TeamOutlined />
            },
            {
                key: "SystemLight",
                title: "作者",
                icon: <TeamOutlined />
            },
            {
                key: "poker",
                title: "表单",
                icon: <TeamOutlined />
            }
        ]
    },
    {
        key: "example2",
        title: "举例-2",
        icon: <TeamOutlined />
    },
    {
        key: "example3",
        title: "举例-3",
        icon: <TeamOutlined />
    }
];
