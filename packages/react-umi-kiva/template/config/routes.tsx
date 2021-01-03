import React from "react";
import {Route} from "@ant-design/pro-layout/es/typings";

/**
 * 基础路由配置参考：https://umijs.org/zh-CN/docs/routing
 * 布局路由配置参考：https://umijs.org/zh-CN/plugins/plugin-layout
 *
 * 约定以下规则而不会被注册
 *  - 以 . 或 _ 开头的文件或目录
 *  - 以 d.ts 结尾的类型定义文件
 *  - 以 test.ts、spec.ts、e2e.ts 结尾的测试文件（适用于 .js、.jsx 和 .tsx 文件）
 *  - components 和 component 目录
 *  - utils 和 util 目录
 *  - 不是 .js、.jsx、.ts 或 .tsx 文件
 *  - 文件内容不包含 JSX 元素
 */
export const routes: Route[] = [
    {
        path: "/",
        component: "@/layouts/BlankLayout",
        routes: [
            {
                path: "/user",
                component: "@/layouts/UserLayout",
                routes: [
                    {
                        path: "/user",
                        redirect: "/user/login"
                    },
                    {
                        path: "/user/login",
                        component: "@/pages/user/login"
                    },
                    {
                        path: "/user/register",
                        component: "@/pages/user/register"
                    },
                    {
                        path: "/user/register-result",
                        component: "@/pages/user/register-result"
                    },
                    {
                        component: "404"
                    }
                ]
            },
            {
                path: "/404",
                component: "@/pages/404"
            },
            {
                path: "/500",
                component: "@/pages/500"
            },
            {
                path: "/",
                component: "@/layouts/Workbench",
                routes: [
                    {
                        path: "/",
                        component: "@/pages/welcome"
                    },
                    {
                        name: "表单页",
                        icon: "form",
                        path: "/form",
                        routes: [
                            {
                                name: "基础表单",
                                path: "/form/basic-form",
                                component: "@/pages/form/basic-form"
                            },
                            {
                                name: "高级表单",
                                path: "/form/advanced-form",
                                component: "@/pages/form/advanced-form"
                            },
                            {
                                component: "@/pages/404"
                            }
                        ]
                    },
                    {
                        name: "请求页",
                        icon: "rocket",
                        path: "/request",
                        routes: [
                            {
                                name: "基础请求",
                                path: "/request/basic-request",
                                component: "@/pages/request/basic-request"
                            },
                            {
                                component: "@/pages/404"
                            }
                        ]
                    },
                    {
                        name: "表格页",
                        icon: "table",
                        path: "/table",
                        routes: [
                            {
                                name: "基础表格",
                                path: "/table/basic-table",
                                component: "@/pages/table/basic-table"
                            },
                            {
                                name: "预设表格",
                                path: "/table/preset-table",
                                component: "@/pages/table/preset-table"
                            },
                            {
                                component: "@/pages/404"
                            }
                        ]
                    },
                    {
                        component: "@/pages/404"
                    }
                ]
            }
        ]
    }
];
