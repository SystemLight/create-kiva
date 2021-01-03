import React, {ReactNode} from "react";
import {Link, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import ProLayout, {MenuDataItem, PageContainer} from "@ant-design/pro-layout";

import {IProWorkbenchProps} from "./interface";

/**
 * 渲染左侧菜单栏，增加点击跳转功能
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

export function ProWorkbench({children, route, ...restProps}: IProWorkbenchProps) {
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    return (
        <ProLayout
            fixSiderbar={true} fixedHeader={true}
            menuItemRender={menuItemRender}
            onMenuHeaderClick={() => history.push("/")}
            route={route} location={location} history={history} match={match}
            {...restProps}
        >
            {children}
        </ProLayout>
    );
}
