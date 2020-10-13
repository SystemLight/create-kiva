import {message} from "antd";

import {IUseAxiosConfig} from "@c/utils/ajax";
import {soul} from "@c/utils/soul";
import commonModel from "@/models/common.model";

/*
    axios request全局配置项
 */
export const axiosGlobalConfig: IUseAxiosConfig = {
    config: {
        baseURL: "/proxy/api"
    },
    errorHandler(e) {
        message.error("请求失败");
    }
};

/*
    状态model需要手动注册
 */
soul.register(commonModel);
export const store = soul.createStore();

/*
    useObserved配置项，用于开启和关闭输出内容
 */
export const openObserved = true;
