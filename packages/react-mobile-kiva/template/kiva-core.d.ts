declare module "*.svg" {
    import {ComponentType} from "react";
    const dataURL: string;
    export const ReactComponent: ComponentType<any>;
    export default dataURL;
}
