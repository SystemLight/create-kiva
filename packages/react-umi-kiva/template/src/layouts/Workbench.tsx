import React, {ReactNode} from "react";
import ProLayout, {BasicLayoutProps, MenuDataItem} from "@ant-design/pro-layout";
import {BreadcrumbProps, Route} from "antd/es/breadcrumb/Breadcrumb";
import {Link} from "umi";

import logo from "@/assets/logo.svg";
import RightContent from "@/components/RightContent";

/**
 * 渲染左侧菜单栏
 * @param {MenuDataItem} menuItemProps
 * @param {ReactNode} defaultDom
 * @return {ReactNode} menuItem
 */
function menuItemRender(menuItemProps: MenuDataItem & {isUrl: boolean}, defaultDom: ReactNode) {
    if (menuItemProps.isUrl || !menuItemProps.path) {
        return defaultDom;
    }
    return <Link to={menuItemProps.path}>{defaultDom}</Link>;
}

/**
 * 渲染面包屑
 * @param {any[]} routers
 * @return {object[]} breadcrumbList
 */
function breadcrumbRender(routers: BreadcrumbProps["routes"] = []): BreadcrumbProps["routes"] {
    return [{path: "/", breadcrumbName: "主页"}, ...routers];
}

/**
 * 渲染面包屑节点对象
 * @param {Route} route
 * @param {any} params
 * @param {Array<Route>} routes
 * @param {Array<string>} paths
 * @return {ReactNode} node
 */
function itemRender(route: Route, params: any, routes: Array<Route>, paths: Array<string>) {
    const first = routes.indexOf(route) === 0;
    return first ? (
        <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
    ) : (
        <span>{route.breadcrumbName}</span>
    );
}

/*
    工作区布局组件
 */
function Workbench({route, location, match, history, children}: BasicLayoutProps) {
    return (
        <ProLayout
            fixSiderbar={true} fixedHeader={true}
            title={"后台管理系统"} logo={logo} menuItemRender={menuItemRender}
            onMenuHeaderClick={() => history?.push("/")}
            breadcrumbRender={breadcrumbRender} itemRender={itemRender}
            rightContentRender={() => <RightContent />}
            route={route} location={location} history={history} match={match}
        >{children}</ProLayout>
    );
}

export default Workbench;
