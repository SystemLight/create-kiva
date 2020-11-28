import "config/global.less";

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";

import {UseAxiosConfig} from "kiva";
import {axiosGlobalConfig, store, Subscription} from "config";
import RootPage from "@@/index";

function App() {
    return (
        <Subscription>
            <UseAxiosConfig value={axiosGlobalConfig}>
                <ConfigProvider locale={zhCN} componentSize={"small"}>
                    <RootPage />
                </ConfigProvider>
            </UseAxiosConfig>
        </Subscription>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById("root")
);
