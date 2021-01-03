import React from "react";

import logo from "@/assets/logo.svg";
import {ProWorkbench, RouteView} from "kiva";
import {route, qr} from "config";

export default function() {
    return (
        <ProWorkbench title={"组件演示"} logo={logo} route={route}>
            <RouteView routes={qr.getRoute("developer")} />
        </ProWorkbench>
    );
}
