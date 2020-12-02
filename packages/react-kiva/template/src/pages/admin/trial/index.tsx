import React from "react";

import {Page, FlutterDummy, IDummyColumn} from "kiva";

export const initColumns: IDummyColumn<any>[] = [
    {
        key: "name",
        dataIndex: "name",
        title: "名字",
        isSort: true,
        isEdit: true
    },
    {
        key: "age",
        dataIndex: "age",
        title: "年龄",
        isSort: true,
        isEdit: true
    },
    {
        key: "sex",
        dataIndex: "sex",
        title: "性别",
        isSort: true,
        isEdit: true
    },
    {
        key: "grades",
        dataIndex: "grades",
        title: "成绩",
        isSort: true,
        isEdit: true
    }
];

export const initDataSource = [
    {
        name: "hello 1",
        age: 23,
        sex: "女",
        grades: 32
    },
    {
        name: "hello 2",
        age: 18,
        sex: "女",
        grades: 22
    },
    {
        name: "hello 3",
        age: 25,
        sex: "男",
        grades: 11
    }
];

export default function View() {
    return (
        <Page>
            <FlutterDummy initColumns={initColumns} dataSource={initDataSource} mapKey={"name"}/>
        </Page>
    );
}

View.title = View.tab = "测试";
