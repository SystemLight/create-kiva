import React from "react";
import {useRequest} from "umi";
import {Card, Table} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import {ColumnsType} from "antd/lib/table/interface";

import {IRecord} from "../_interface";

const columns: ColumnsType<IRecord> = [
    {
        key: "name",
        dataIndex: "name",
        title: "姓名"
    },
    {
        key: "age",
        dataIndex: "age",
        title: "年龄"
    },
    {
        key: "address",
        dataIndex: "address",
        title: "住址"
    }
];

function BasicTable() {
    const {data, loading} = useRequest<IRecord[]>("/api/basic-table");

    return (
        <PageContainer content={"基础表格仅用来展示数据"}>
            <Card bordered={false}>
                <Table columns={columns} dataSource={data} loading={loading} rowKey={"id"} />
            </Card>
        </PageContainer>
    );
}

export default BasicTable;

