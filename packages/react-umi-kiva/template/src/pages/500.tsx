import React from "react";
import {Button, Result} from "antd";
import {history} from "umi";

export default function() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="抱歉, 未知的系统异常."
            extra={
                <Button type="primary" onClick={() => history.push("/")}>
                    返回主页
                </Button>
            }
        />
    );
};
