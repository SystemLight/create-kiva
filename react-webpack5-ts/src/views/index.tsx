import React from "react";
import {useLocation} from "react-router-dom";

import RouteView from "@c/components/routeView";
import R404Page from "@c/components/reason/404";
import {Workbench} from "@c/components/workbench";
import {useUrlBreadcrumbItems, RootBreadcrumb} from "@c/components/workbench/breadcrumb";
import {RootMenus} from "@c/components/workbench/menus";
import {useObserved} from "@c/utils/useHooks";
import {navs} from "@/navs";
import {routes} from "@/route";

export default function RootPage() {
    useObserved("RootPage");

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
