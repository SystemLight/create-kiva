import {ReactNode} from "react";

export interface IRootNav {
    key: string,
    title: string,
    icon?: ReactNode,
    items?: IRootNav[]
}

export interface IRootMenusProps {
    navs: IRootNav[]
}

export interface IBreadcrumbItem {
    key: string,
    title: string,
}

export interface IRootBreadcrumbProps {
    items: IBreadcrumbItem[]
}
