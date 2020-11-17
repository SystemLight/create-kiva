import React, {useMemo} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import {IBreadcrumbItem, INavData} from "./interface";

/*
    根据路由路径计算面包屑导航元素
*/
export function useUrlBreadcrumbItems(pathname: string, rootNavs: INavData[]) {
    return useMemo<IBreadcrumbItem[]>(() => {
        const items: IBreadcrumbItem[] = [];
        let tmpNav = rootNavs;
        const navList = pathname.split("/");
        navList.forEach((v) => {
            if (v) {
                const nav = tmpNav.find((nv) => nv.key === v);
                if (nav) {
                    tmpNav = nav.items || [];
                    items.push({key: nav.key, title: nav.title});
                }
            }
        });
        return items;
    }, [pathname, rootNavs]);
}

export const getMenuItem = (v: INavData, i: number, to: string) => (
    <Menu.Item key={v.key} icon={v.icon}>
        <Link to={v.path || to}><span>{v.title}</span></Link>
    </Menu.Item>
);
