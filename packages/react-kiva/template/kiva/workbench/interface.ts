import {ReactElement, ReactNode} from "react";

export interface IWorkbenchProps {
    children: ReactNode,
    topBar?: ReactNode,
    breadcrumb?: ReactNode,
    menus: ReactNode,
    footer?: ReactNode,
    logoUrl: string,
    title?: string,
    tabs?: ITabs,
    onTabRemove?: (activeKey: string) => void
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
