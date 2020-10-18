import React from "react";

import {RouteView} from "@c/routeView";
import {useObserved} from "@c/useHooks";
import {routes} from "@/config";

function App() {
    useObserved("App");

    return (<RouteView routes={routes} />);
}

export default App;
