declare module "*.svg" {
    import {ComponentType} from "react";
    const dataURL: string;
    export const ReactComponent: ComponentType<any>;
    export default dataURL;
}

declare module "*.module.less" {
    const classes: {readonly [key: string]: string};
    export default classes;
}

declare namespace React {
    export interface FunctionComponent<P = {}> {
        // 注入页处理中间属性声明类型

        access?: [string, string], // [状态key值，重定向路由]
        title?: string, // 文档标题
        tab?: string, // 注册动态Tabs到组件中的名称
    }
}
