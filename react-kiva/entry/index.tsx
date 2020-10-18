import "./global.less";

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";

import {UseAxiosConfig} from "kiva";
import {axiosGlobalConfig, store, Subscription} from "./config";
import App from "./app";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Subscription>
                <UseAxiosConfig value={axiosGlobalConfig}>
                    <ConfigProvider locale={zhCN} componentSize={"middle"}>
                        <App />
                    </ConfigProvider>
                </UseAxiosConfig>
            </Subscription>
        </BrowserRouter>
    </Provider>
    , document.getElementById("root")
);
