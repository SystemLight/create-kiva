import "antd/dist/antd.less";
import "./global.less";

import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {ConfigProvider} from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import {UseAxiosConfig} from "kiva";
import {axiosGlobalConfig, Subscription} from "config";
import RootPage from "@@/index";
import {store} from "@/models";

function App() {
    return (
        <Subscription>
            <UseAxiosConfig value={axiosGlobalConfig}>
                <ConfigProvider locale={zhCN} componentSize={"middle"}>
                    <RootPage />
                </ConfigProvider>
            </UseAxiosConfig>
        </Subscription>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>
    , document.getElementById("root")
);
