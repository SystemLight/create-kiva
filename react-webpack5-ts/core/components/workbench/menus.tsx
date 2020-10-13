import React, {memo} from "react";
import {Link, useLocation} from "react-router-dom";
import {MenuProps} from "antd/es/menu";
import {Menu} from "antd";

import {IRootNav, IRootMenusProps} from "./interface";

/*
    主页菜单组件
 */
export const getMenuItem = (v: IRootNav, i: number, to: string) => (
    <Menu.Item key={v.key} icon={v.icon}>
        <Link to={to}><span>{v.title}</span></Link>
    </Menu.Item>
);

export const menuProps: MenuProps = {
    theme: "dark",
    mode: "inline",
    inlineIndent: 16
};

export const RootMenus = memo(function({navs}: IRootMenusProps) {
    const {pathname} = useLocation();
    const pathnameList = pathname.split("/");

    return (
        <Menu defaultOpenKeys={pathnameList} defaultSelectedKeys={pathnameList} {...menuProps} >
            {
                navs.map((v, i) => v.items ? (
                    <Menu.SubMenu key={v.key} title={v.title} icon={v.icon}>
                        {v.items.map((c, ci) => getMenuItem(c, ci, `/${v.key}/${c.key}`))}
                    </Menu.SubMenu>
                ) : getMenuItem(v, i, `/${v.key}`))
            }
        </Menu>
    );
}, (oldProps, newProps) => {
    return oldProps.navs === newProps.navs;
});
