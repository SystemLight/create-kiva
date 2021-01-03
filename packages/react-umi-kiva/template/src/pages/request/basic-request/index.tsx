import React from "react";
import {Card} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import {useRequest} from "umi";

import JsonHighlight from "@/components/Highlight";

function BasicRequest() {
    const {data} = useRequest("/api/data");

    return (
        <PageContainer content={"展示umi中数据请求基本实现方法"}>
            <Card bordered={false}>
                <h3>请求数据：</h3>
                <JsonHighlight data={data} />
            </Card>
        </PageContainer>
    );
}

export default BasicRequest;
