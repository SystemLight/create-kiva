import React from "react";

import RouteView from "@c/components/routeView";
import {useObserved} from "@c/utils/useHooks";
import routes from "@/route";

function App() {
    useObserved("App");

    return (<RouteView routes={routes} />);
}

export default App;
