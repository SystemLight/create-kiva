import React from "react";
import {Redirect} from "react-router-dom";

import {RouteView, R404Page} from "kiva";
import {qr} from "config";

const toIndex = {
    key: "toIndex",
    path: "/",
    exact: true,
    component: () => <Redirect to={"/developer"} />
};

export default () => (<RouteView before={toIndex} routes={qr.routes} after={R404Page} />);
