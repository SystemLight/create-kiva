import {ComponentType, ReactNode} from "react";
import {Dispatch} from "redux";
import {SwitchProps, RouteProps} from "react-router";
import * as H from "history";

export interface ISubscription {
    [key: string]: (dispatch: Dispatch<any>, pathname: string) => void
}

export interface IRoutesContent extends RouteProps {
    key: string,
    subRoute?: IRoutes,
}

export type IRoutes = IRoutesContent[];

export interface IRouteViewProps extends SwitchProps {
    before?: IRoutesContent,
    routes?: IRoutes,
    after?: ComponentType
}

export interface IChangeRouteCallback {
    (location: H.Location): void
}

export interface IPlugin<P = any> {
    (component: any, args: any, props: {[key: string]: P}): {default: any}
}
