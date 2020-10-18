import React, {useMemo, memo} from "react";
import {Breadcrumb} from "antd";

import {IBreadcrumbItem, IRootNav, IRootBreadcrumbProps} from "./interface";

/*
    根据路由路径计算面包屑导航元素
*/
export function useUrlBreadcrumbItems(pathname: string, rootNavs: IRootNav[]) {
    return useMemo<IBreadcrumbItem[]>(() => {
        const items: IBreadcrumbItem[] = [];
        let tmpNav: IRootNav[] = rootNavs;
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

/*
    主页面包屑组件
 */
export const RootBreadcrumb = memo(function({items}: IRootBreadcrumbProps) {
    return (
        <Breadcrumb style={{margin: "16px 0"}}>
            {
                items.map((v, i) => (
                    <Breadcrumb.Item key={v.key}>{v.title}</Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    );
}, (oldProps, newProps) => {
    return oldProps.items === newProps.items;
});
