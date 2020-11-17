import React, {ComponentType} from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

import {ISoulModel} from "../soul";

/*
    使用Access组件的前提必须注册namespace为@@access的soul状态模型，
    其中access名称与该命名空间状态属性名称一致且为布尔值，该状态标志当前组件是否含有访问权限，
    当无权进行组件访问时，Access组件重定向到/404页面
 */
export function access(access?: string, redirect?: string) {
    return <P extends {}>(component: ComponentType<P>) => (props: P) => {
        if (!access) {
            return React.createElement<P>(component, props);
        }
        const authority = useSelector<{["@@access"]: any}, boolean>(
            (state) => state["@@access"][access]
        );
        if (!authority) {
            return redirect ? (<Redirect to={redirect} />) : (<></>);
        }
        return React.createElement<P>(component, props);
    };
}

export function useAccess<T = any>(access: string | ((res: T) => boolean)) {
    return useSelector<{["@@access"]: any}, boolean>(
        (state) => {
            if (typeof access === "function") {
                return access(state["@@access"]);
            } else {
                return state["@@access"][access];
            }
        }
    );
}

export function createAccessModel<S = any>(state: S): ISoulModel<S> {
    return {
        namespace: "@@access",
        state: state
    };
}
