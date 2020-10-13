import React from "react";
import {Result, Button} from "antd";
import {Link} from "react-router-dom";

export default function R404Page() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="抱歉，这个页面不存在."
            extra={<Button type="primary"><Link to={"/"}>返回主页</Link></Button>}
        />
    );
}
