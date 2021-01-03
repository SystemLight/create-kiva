import React, {PropsWithChildren} from "react";

/*
    空白布局组件，用于路由占位
 */
function BlankLayout(props: PropsWithChildren<any>) {
    return (<>{props.children}</>);
}

export default BlankLayout;
