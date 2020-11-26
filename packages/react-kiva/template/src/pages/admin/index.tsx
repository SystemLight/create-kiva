import React from "react";

import {DesignWorkBench, Browser} from "kiva";

export default function() {
    return (
        <DesignWorkBench title={"可视化编辑器"}>
            <Browser>
                <div className="browser-body">
                    hello kiva
                </div>
            </Browser>
        </DesignWorkBench>
    );
}
