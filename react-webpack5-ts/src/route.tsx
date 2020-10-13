import React, {memo} from "react";
import {Alert} from "antd";

import {QueryRoute, createSubscription, dynamic} from "@c/components/routeView/utils";
import {IRoutes} from "@c/components/routeView/interface";
import R404Page from "@c/components/reason/404";
import RootPage from "@v/index";
/* <AgreedRoutingImport> */
/* </AgreedRoutingImport> */

export const Welcome = memo(function() {
    return (
        <div style={{padding: 15}}>
            <Alert
                message="管理首页"
                description="欢迎进入管理首页 !"
                type="info"
            />
        </div>
    );
}, () => true);

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
            {
                key: "welcome",
                path: "/",
                exact: true,
                component: Welcome
                /* eslint-disable comma-dangle */
            },
            /* <AgreedRouting> */
            {key: "example",path: "/example",component: dynamic(() => import(/* webpackChunkName: "example" */"@v/example")),subRoute: [{key: "edittable",path: "/example/edittable",component: dynamic(() => import(/* webpackChunkName: "example-edittable" */"@v/example/edittable")),exact: true},{key: "my",path: "/example/my",component: dynamic(() => import(/* webpackChunkName: "example-my" */"@v/example/my")),exact: true},{key: "[users]",path: "/example/:users",component: dynamic(() => import(/* webpackChunkName: "example-[users]" */"@v/example/[users]")),exact: true}],exact: false},
            /* </AgreedRouting> */
        ]
    },
    {
        key: "notFound",
        path: ["*", "/404"],
        component: R404Page
    }
];

/*
    创建订阅组件，该组件放置在History组件之后，App组件之前，
    用于监听路由变化进行回调执行函数
 */
export const Subscription = createSubscription({
    "/": (dispatch) => {
        console.log("-----------------hello root page-----------------");
    }
});

export const qr = new QueryRoute(routes);
export default routes;
