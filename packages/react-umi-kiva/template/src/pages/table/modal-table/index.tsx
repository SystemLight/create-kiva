import React from "react";
import {Card} from "antd";
import {useRequest} from "umi";
import {ProColumns} from "@ant-design/pro-table";
import {PageContainer} from "@ant-design/pro-layout";

import {ChoPresetTable} from "@/components/ChoTable";
import {isSorter} from "@/components/ChoTable/assembly";
import {IRecord} from "../_interface";

const columns: ProColumns<IRecord>[] = [
    {
        key: "id",
        dataIndex: "id",
        title: "ID"
    },
    {
        key: "name",
        dataIndex: "name",
        title: "姓名",
        sorter: isSorter("name")
    },
    {
        key: "age",
        dataIndex: "age",
        title: "年龄",
        sorter: isSorter("age")
    },
    {
        key: "address",
        dataIndex: "address",
        title: "住址",
        sorter: isSorter("address")
    }
];

function ModalTable() {
    const {data, loading} = useRequest<IRecord[]>("/api/basic-table");

    return (
        <PageContainer content={"预设表格内置常用功能"}>
            <Card bordered={false}>
                <ChoPresetTable columns={columns} dataSource={data} loading={loading} />
            </Card>
        </PageContainer>
    );
}

export default ModalTable;

