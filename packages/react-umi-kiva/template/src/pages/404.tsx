import React from "react";
import {Button, Result} from "antd";
import {history} from "umi";

export default function() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="抱歉, 访问的页面不存在."
            extra={
                <Button type="primary" onClick={() => history.push("/")}>
                    返回主页
                </Button>
            }
        />
    );
};
