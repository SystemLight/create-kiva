import React, {useState} from "react";
import {Form, Input} from "antd";
import {ProColumns} from "@ant-design/pro-table";

import {Page, CrudModalTable, sorter} from "kiva";
import {RowState} from "kiva/crudTable/rowState";

export const initColumns: ProColumns[] = [
    {
        key: "id",
        dataIndex: "id",
        title: "ID"
    },
    {
        key: "name",
        dataIndex: "name",
        title: "名字",
        sorter: (a: any, b: any) => sorter(a, b, "name")
    },
    {
        key: "age",
        dataIndex: "age",
        title: "年龄",
        sorter: (a: any, b: any) => sorter(a, b, "age")
    },
    {
        key: "sex",
        dataIndex: "sex",
        title: "性别",
        sorter: (a: any, b: any) => sorter(a, b, "sex")
    },
    {
        key: "grades",
        dataIndex: "grades",
        title: "成绩",
        sorter: (a: any, b: any) => sorter(a, b, "grades")
    }
];

export const initDataSource = [
    {
        id: 1,
        name: "hello 1",
        age: 23,
        sex: "女",
        grades: 32,
        rowState: RowState.Unchanged
    },
    {
        id: 2,
        name: "hello 2",
        age: 18,
        sex: "女",
        grades: 22,
        rowState: RowState.Unchanged
    },
    {
        id: 3,
        name: "hello 3",
        age: 25,
        sex: "男",
        grades: 11,
        rowState: RowState.Unchanged
    }
];

export default function View() {
    const [form] = Form.useForm();
    const [data, setData] = useState(initDataSource);

    return (
        <Page>
            <CrudModalTable modalForm={form} columns={initColumns} dataSource={data} onDataChange={setData}>
                <Form form={form}>
                    <Form.Item name={"name"} label={"名称"}>
                        <Input />
                    </Form.Item>
                </Form>
            </CrudModalTable>
        </Page>
    );
}

View.title = View.tab = "测试";
