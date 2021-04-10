import {createElement, ReactNode} from "react";
import {RequestConfig, UseRequestProvider} from "umi";

import {IErrorInfoStructure, IUseRequestOptions} from "@/types";
import {ErrorShowType} from "@@/plugin-request/request";

// 基础运行时配置：https://umijs.org/zh-CN/docs/runtime-config

/**
 * umi内置的request全局配置参数
 */
export const request: RequestConfig & {skipErrorHandler?: boolean} = {
    timeout: 30000,
    errorConfig: {
        errorPage: "/500",
        adaptor(resData, context): IErrorInfoStructure {
            const {res} = context;
            if (!(res instanceof Response)) {
                return {success: true};
            }
            return {
                success: false,
                data: resData,
                errorCode: context.res.status,
                errorMessage: resData,
                showType: context.res.status > 499 ? ErrorShowType.REDIRECT : ErrorShowType.ERROR_MESSAGE
            };
        }
    },
    middlewares: [],
    requestInterceptors: [],
    responseInterceptors: []
};

/**
 * umi内置的UseRequest hook函数全局配置参数
 */
const globalUseRequestConfig: IUseRequestOptions = {};

export function rootContainer(LastRootContainer: ReactNode) {
    return createElement(UseRequestProvider, {value: globalUseRequestConfig}, LastRootContainer);
}
