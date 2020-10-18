import React, {memo} from "react";
import {Switch, Route} from "react-router-dom";

import {IRouteViewProps} from "./interface";

export const RouteView = memo(function({routes, location, before, children}: IRouteViewProps) {
    return (
        <Switch location={location}>
            {before && (<Route {...before} />)}
            {/* eslint-disable-next-line react/jsx-key */}
            {routes ? routes.map((r) => (<Route {...r} />)) : undefined}
            {children && (<Route component={children} />)}
        </Switch>
    );
}, (oldProp, newProp) => {
    return oldProp.routes === newProp.routes && oldProp.location === newProp.location && oldProp.children === newProp.children;
});

export * from "./interface";
export * from "./utils";
