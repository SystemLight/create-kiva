import React from "react";

import {RouteView, R404Page} from "kiva";
import {qr} from "config";

export default () => (<RouteView routes={qr.getRoute("user")} after={R404Page} />);
