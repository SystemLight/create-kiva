import React, {memo} from "react";
import {Switch, Route} from "react-router-dom";

import {IRouteViewProps} from "./interface";

export default memo(function({routes, location, children}: IRouteViewProps) {
    return (
        <Switch location={location}>
            {/* eslint-disable-next-line react/jsx-key */}
            {routes ? routes.map((r) => (<Route {...r} />)) : undefined}
            {children ? (<Route component={children} />) : undefined}
        </Switch>
    );
}, (oldProp, newProp) => {
    return oldProp.routes === newProp.routes && oldProp.location === newProp.location && oldProp.children === newProp.children;
});
