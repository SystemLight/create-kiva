import React, {memo} from "react";
import {Button, Alert} from "antd";
import {FullscreenOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";

import {
    LightWorkbench, LightMenus, LightBreadcrumb,
    useUrlBreadcrumbItems, RouteView, R404Page
} from "kiva";
import {navs, qr} from "config";
import {useTabs} from "@@/utils";

const welcomeRoute = {
    key: "welcome",
    path: "/admin",
    exact: true,
    component: memo(() => (
        <div style={{padding: 15}}><Alert message="后台管理" description="欢迎使用后台管理系统 !" type="info" /></div>
    ), () => true)
};

export default function() {
    const {pathname} = useLocation();
    const breadcrumbItems = useUrlBreadcrumbItems(pathname, navs);
    const [tabs, onTabRemove] = useTabs(pathname);

    const topBar = (
        <Button.Group>
            <Button type={"text"} style={{fontSize: 20, border: 0}}><UserOutlined /></Button>
            <Button type={"text"} style={{fontSize: 20, border: 0}}><SettingOutlined /></Button>
            <Button type={"text"} style={{fontSize: 20, border: 0}}><FullscreenOutlined /></Button>
        </Button.Group>
    );

    return (
        <LightWorkbench
            menus={<LightMenus navs={navs} />} logoUrl={"/light-logo.png"}
            tabs={tabs} onTabRemove={onTabRemove}
            breadcrumb={<LightBreadcrumb items={breadcrumbItems} />}
            topBar={topBar}
        >
            <RouteView before={welcomeRoute} routes={qr.getRoute("admin")} after={R404Page} />
        </LightWorkbench>
    );
}
