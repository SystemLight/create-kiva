import {ComponentType} from "react";
import * as H from "history";
import {SwitchProps} from "react-router";

export interface IRoutesContent {
    key: string,
    path: string | Array<string>,
    exact?: boolean,
    component: ComponentType
    subRoute?: IRoutes
}

export type IRoutes = IRoutesContent[];

export interface IRouteViewProps extends SwitchProps {
    routes?: IRoutes,
    children?: ComponentType
}

export interface IChangeRouteCallback {
    (location: H.Location): void
}
