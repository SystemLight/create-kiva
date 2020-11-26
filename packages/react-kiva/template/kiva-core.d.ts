declare module "*.svg" {
    import {ComponentType} from "react";
    const dataURL: string;
    export const ReactComponent: ComponentType<any>;
    export default dataURL;
}

declare namespace React {
    export interface FunctionComponent<P = {}> {
        // 注入页处理中间属性声明类型
        access?: [string, string],
        title?: string,
        tab?: string,
    }
}
