import {RefObject} from "react";

import {ErrorShowType} from "@@/plugin-request/request";
import {BaseOptions, BasePaginatedOptions, LoadMoreOptions, OptionsWithFormat} from "@ahooksjs/use-request/lib/types";

export interface IErrorInfoStructure<D = any> {
    // 请求是否成功
    success: boolean,

    // 返回的数据
    data?: D,

    // 错误code
    errorCode?: string;

    // 错误消息
    errorMessage?: string,

    // 错误显示类型： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
    showType?: ErrorShowType,

    // 方便后端故障排除：唯一的请求ID
    traceId?: string,

    // 方便后端故障排除：当前访问的服务器地址
    host?: string,
}

export interface IRequestError<D = any> extends Error {
    data?: D,
    info?: IErrorInfoStructure<D>,
}

export interface IDeclareUseRequestOptions {
    // 在初始化时是否自动执行 service
    manual?: boolean,

    // 默认的 data
    initialData?: any,

    // 在 manual = false 时，refreshDeps 变化，会触发 service 重新执行
    refreshDeps?: any[],

    // 格式化请求结果
    formatResult?: (response: any) => any,

    // service resolve 时触发
    onSuccess?: (data: any, params: any[]) => void,

    // service 报错时触发，参数为 error 和 params
    onError?: (error: Error, params: any[]) => void,

    // 根据 params，获取当前请求的 key，设置之后，我们会在 fetches 中同时维护不同 key 值的请求状态
    fetchKey?: (...params: any[]) => string,

    // 如果 manual=false ，自动执行 run 的时候，默认带上的参数
    defaultParams?: any[],

    // 设置显示 loading 的延迟时间，避免闪烁
    loadingDelay?: number,

    // 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 run
    pollingInterval?: number,

    // 在页面隐藏时，是否继续轮询
    pollingWhenHidden?: boolean,

    // 在屏幕重新获取焦点或重新显示时，是否重新发起请求
    refreshOnWindowFocus?: boolean,

    // 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求
    focusTimespan?: number,

    // 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式
    debounceInterval?: number,

    // 节流间隔, 单位为毫秒，设置后，请求进入节流模式
    throttleInterval?: number,

    // 只有当 ready 为 true 时，才会发起请求
    ready?: boolean,

    // 如果 service 报错，我们会帮你捕获并打印日志，如果你需要自己处理异常，可以设置 throwOnError 为 true
    throwOnError?: boolean,

    // 请求唯一标识。如果设置了 cacheKey，我们会启用缓存机制
    cacheKey?: string,

    // 设置缓存数据回收时间
    cacheTime?: number,

    // 缓存数据保持新鲜时间
    staleTime?: number,

    // 异步请求方法，参数为 service 或 service 返回的参数
    requestMethod?: (service: string | object) => Promise<any>,

    // 如果设置为 true，则开启分页模式
    paginated?: boolean,

    // 默认每页的数量
    defaultPageSize?: number,

    // 是否开启加载更多模式
    loadMore?: boolean,

    // 容器的 ref，如果存在，则在滚动到底部时，自动触发 loadMore
    ref?: RefObject<HTMLElement>,

    // 判断是否还有更多数据的函数
    isNoMore?: (r: any) => boolean,

    // 下拉自动加载，距离底部距离阈值
    threshold?: number,
}

export type IUseRequestOptions =
    BaseOptions<any, any>
    | OptionsWithFormat<any, any, any, any>
    | BasePaginatedOptions<any>
    | LoadMoreOptions<any>
