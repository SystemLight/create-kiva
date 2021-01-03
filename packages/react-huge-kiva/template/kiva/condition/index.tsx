import React, {ReactElement} from "react";

import {ISwitchBoxProps, ICaseBoxProps, IDisplayConProps} from "./interface";

/*
    组件显示切换
 */
export function DisplayCon({display, children}: IDisplayConProps): ReactElement {
    if (display) {
        return (<>{children}</>);
    } else {
        return (<></>);
    }
}

/*
    switch组件函数用于判断当前的显示组件
 */
export function SwitchCon({value, children}: ISwitchBoxProps): ReactElement {
    for (const c in children) {
        if (children[c].props.condition === value || children[c].props.condition === "**") {
            return children[c];
        }
    }
    return (<></>);
}

/*
    case组件包裹其它组件
 */
export function CaseCon({condition, children}: ICaseBoxProps): ReactElement {
    return (<>{children}</>);
}
