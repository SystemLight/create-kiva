import React from "react";
import {Result, Button} from "antd";
import {Link} from "react-router-dom";

export default function R500Page() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="抱歉，出现了一些错误."
            extra={<Link to="/"><Button type="primary">返回主页</Button></Link>}
        />
    );
}
