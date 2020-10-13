import "@/global.less";

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";

import {UesAxiosConfig} from "@c/utils/ajax";
import App from "@/app";
import {axiosGlobalConfig, store} from "@/config";

ReactDOM.render(
    <ConfigProvider locale={zhCN} componentSize={"middle"}>
        <UesAxiosConfig value={axiosGlobalConfig}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </UesAxiosConfig>
    </ConfigProvider>
    , document.getElementById("root")
);
