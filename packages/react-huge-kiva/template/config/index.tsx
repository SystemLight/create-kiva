import React from "react";
import {message} from "antd";
import {FormOutlined, CameraOutlined, FireOutlined, RocketOutlined} from "@ant-design/icons";

import {
    IRequestConfig, globalRequestConfig,
    IDispatch, R404Page, QueryRoute,
    createSubscription, access, dynamic, IProWorkbenchRoute
} from "kiva";
import {useTab} from "@/utils/tabs";

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
    路由全局配置
    1. 自动路由将按照views下的目录结构自动填写路由表
    2. 默认启用，通过webpack.config.js配置
    3. 启用后AgreedRouting标签中内容将会自动填写路由表
 */
export const qr = new QueryRoute([
    /* <AgreedRouting> */
    {
        key: "developer",
        path: "/developer",
        component: dynamic(() => import(/* webpackChunkName: "developer" */"@@/developer")),
        subRoute: [{
            key: "data.form",
            path: "/developer/data/form",
            component: dynamic(() => import(/* webpackChunkName: "developer-data.form" */"@@/developer/data.form")),
            exact: true
        }, {
            key: "data.list",
            path: "/developer/data/list",
            component: dynamic(() => import(/* webpackChunkName: "developer-data.list" */"@@/developer/data.list")),
            exact: true
        }, {
            key: "data.table",
            path: "/developer/data/table",
            component: dynamic(() => import(/* webpackChunkName: "developer-data.table" */"@@/developer/data.table")),
            exact: true
        }, {
            key: "media.audio",
            path: "/developer/media/audio",
            component: dynamic(() => import(/* webpackChunkName: "developer-media.audio" */"@@/developer/media.audio")),
            exact: true
        }, {
            key: "media.edit",
            path: "/developer/media/edit",
            component: dynamic(() => import(/* webpackChunkName: "developer-media.edit" */"@@/developer/media.edit")),
            exact: true
        }, {
            key: "media.live",
            path: "/developer/media/live",
            component: dynamic(() => import(/* webpackChunkName: "developer-media.live" */"@@/developer/media.live")),
            exact: true
        }, {
            key: "media.picture",
            path: "/developer/media/picture",
            component: dynamic(() => import(/* webpackChunkName: "developer-media.picture" */"@@/developer/media.picture")),
            exact: true
        }, {
            key: "media.video",
            path: "/developer/media/video",
            component: dynamic(() => import(/* webpackChunkName: "developer-media.video" */"@@/developer/media.video")),
            exact: true
        }, {
            key: "motion.basic",
            path: "/developer/motion/basic",
            component: dynamic(() => import(/* webpackChunkName: "developer-motion.basic" */"@@/developer/motion.basic")),
            exact: true
        }, {
            key: "utils.demo",
            path: "/developer/utils/demo",
            component: dynamic(() => import(/* webpackChunkName: "developer-utils.demo" */"@@/developer/utils.demo")),
            exact: true
        }],
        exact: false
    },
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
            useTab(args);
            return React.createElement(component);
        }
    };
});

export const route: IProWorkbenchRoute = {
    key: "developer",
    path: "/developer",
    routes: [
        {
            key: "data",
            name: "数据",
            icon: <FormOutlined />,
            routes: [
                {
                    key: "list",
                    name: "列表",
                    path: "/developer/data/list"
                },
                {
                    key: "form",
                    name: "表单",
                    path: "/developer/data/form"
                },
                {
                    key: "table",
                    name: "表格",
                    path: "/developer/data/table"
                }
            ]
        },
        {
            key: "media",
            name: "媒体",
            icon: <CameraOutlined />,
            routes: [
                {
                    key: "picture",
                    name: "图片",
                    path: "/developer/media/picture"
                },
                {
                    key: "audio",
                    name: "音频",
                    path: "/developer/media/audio"
                },
                {
                    key: "video",
                    name: "视频",
                    path: "/developer/media/video"
                },
                {
                    key: "live",
                    name: "直播",
                    path: "/developer/media/live"
                },
                {
                    key: "edit",
                    name: "编辑",
                    path: "/developer/media/edit"
                }
            ]
        },
        {
            key: "motion",
            name: "动画",
            icon: <FireOutlined />,
            routes: [
                {
                    key: "basic",
                    name: "基础",
                    path: "/developer/motion/basic"
                }
            ]
        },
        {
            key: "utils",
            name: "工具",
            icon: <RocketOutlined />,
            routes: [
                {
                    key: "demo",
                    name: "演示",
                    path: "/developer/utils/demo"
                }
            ]
        }
    ]
};
