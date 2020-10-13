const fs = require("fs");

const rootPath = "src/views/index.tsx";
if (!fs.existsSync(rootPath)) {
    fs.writeFileSync(rootPath, `import React from "react";
import {useLocation} from "react-router-dom";

import RouteView from "@core/components/routeView";
import R404Page from "@core/components/reason/404";
import {Workbench} from "@core/components/workbench";
import {useUrlBreadcrumbItems, RootBreadcrumb} from "@core/components/workbench/breadcrumb";
import {RootMenus} from "@core/components/workbench/menus";
import {navs} from "@/navs";
import {routes} from "@/route";

export default function RootPage() {
    const {pathname} = useLocation();
    const breadcrumbItems = useUrlBreadcrumbItems(pathname, navs);

    return (
        <Workbench
            breadcrumb={<RootBreadcrumb items={breadcrumbItems} />}
            menus={<RootMenus navs={navs} />} logoUrl={"/logo.png"}
        >
            <RouteView routes={routes[0].subRoute}>{R404Page}</RouteView>
        </Workbench>
    );
}
`);
}

const navPath = "src/navs.tsx";
if (!fs.existsSync(navPath)) {
    fs.writeFileSync(navPath, `import React from "react";

import {IRootNav} from "@core/components/workbench/interface";

/*
    主页导航栏结构树，快速配置通用左侧导航栏，并生成对应面包屑，
    key值必须与约定式路由中目录名结构一致，嵌套结构亦如此
 */
export const navs: IRootNav[] = [
];
`);
}
