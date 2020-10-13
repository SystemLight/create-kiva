import {useEffect} from "react";

import {openObserved} from "@/config";

/*
    观察组件的渲染和卸载时机，并输出打印LOG
 */
export function useObserved(componentName: string) {
    if (openObserved) {
        console.log(`${componentName}被渲染`);
    }
    const __componentName = componentName;
    useEffect(() => () => openObserved && console.log(`${__componentName}被卸载`), []);
}
