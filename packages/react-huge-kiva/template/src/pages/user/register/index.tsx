import React from "react";

import {RouteView, R404Page} from "kiva";
import {qr} from "config";

export default function() {
    return (
        <div>
            <RouteView routes={qr.getRoute("user/register")} after={
                () => <h1 style={{textAlign: "center"}}>访问组件：src\pages\user\register\index.tsx</h1>
            } />
        </div>
    );
}
