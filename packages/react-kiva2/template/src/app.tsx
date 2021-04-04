import "antd/dist/antd.less";
import "./global.less";

import React from "react";
import ReactDOM from "react-dom";
import {ConfigProvider} from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import Index from "@@/index";

ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider locale={zhCN} componentSize={"middle"}>
            <Index />
        </ConfigProvider>
    </React.StrictMode>
    , document.getElementById("root")
);
