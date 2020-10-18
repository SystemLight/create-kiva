import {ComponentType} from "react";
import {SwitchProps} from "react-router";
import {Dispatch} from "redux";
import * as H from "history";

export interface ISubscription {
    [key: string]: (dispatch: Dispatch<any>) => void
}

export interface IRoutesContent {
    key: string,
    path: string | Array<string>,
    exact?: boolean,
    component: ComponentType
    subRoute?: IRoutes
}

export type IRoutes = IRoutesContent[];

export interface IRouteViewProps extends SwitchProps {
    before?: IRoutesContent,
    routes?: IRoutes,
    children?: ComponentType
}

export interface IChangeRouteCallback {
    (location: H.Location): void
}
