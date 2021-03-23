import {defineConfig} from "umi";

import {routes} from "./routes";
import {proxy} from "./proxy";

const {REACT_APP_ENV} = process.env;

/**
 * 更多配置参考：https://umijs.org/zh-CN/config
 * 环境变量配置：https://umijs.org/zh-CN/docs/env-variables
 */
export default defineConfig({
    outputPath: "build",
    nodeModulesTransform: {
        type: "none"
    },
    request: {
        dataField: ""
    },
    hash: true,
    dva: {
        hmr: true
    },
    history: {
        type: "browser"
    },
    locale: {
        default: "zh-CN",
        antd: true,
        baseNavigator: true
    },
    targets: {
        ie: 11
    },
    routes: routes,
    title: "后台管理系统",
    ignoreMomentLocale: true,
    mock: {exclude: []},
    proxy: proxy[REACT_APP_ENV || "dev"]
});
