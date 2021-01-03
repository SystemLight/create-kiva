import {ReactElement, ReactNode} from "react";
import {BasicLayoutProps} from "@ant-design/pro-layout";

export interface IWorkbenchProps {
    children: ReactNode,
    topBar?: ReactNode,
    breadcrumb?: ReactNode,
    menus: ReactNode,
    footer?: ReactNode,
    logoUrl: string,
    title?: string,
    tabs?: ITabs,
    onTabRemove?: (activeKey: string) => void,
    onSetting?: () => void,
}

export interface ITabs {
    [to: string]: {title: string}
}

export interface INavData {
    key: string,
    title: string,
    path?: string,
    icon?: ReactNode,
    meta?: any,
    items?: INavData[]
}

export interface IMenusProps {
    navs: INavData[],
    prefix?: string,
}

export interface IBreadcrumbItem {
    key: string,
    title: string,
}

export interface IBreadcrumbProps {
    items: IBreadcrumbItem[]
}

export interface IDesignWorkBenchProps {
    headerBtn1?: ReactElement,
    headerBtn2?: ReactElement,
    headerBtn3?: ReactElement,
    title?: string,
    left?: ReactElement,
    right?: ReactElement,
}

export interface IProWorkbenchRoute {
    key?: any,
    name?: string,
    path?: string,
    icon?: ReactNode,
    routes?: IProWorkbenchRoute[]
}

export interface IProWorkbenchProps {
    children: ReactNode,
    route?: IProWorkbenchRoute,
    title?: string,
    logo?: ReactNode,
}
