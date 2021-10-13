import {ComponentType} from "react";

declare module "*.svg" {
    const dataURL: string;
    export const ReactComponent: ComponentType<any>;
    export default dataURL;
}

declare module "*.module.less" {
    const classes: {readonly [key: string]: string};
    export default classes;
}
