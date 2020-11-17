import React, {useCallback, useState} from "react";

import {IDummyColumn, InputNumberCell, buildSelectCell, Page, ProDummy} from "kiva";

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
        isEdit: true,
        editComponent: InputNumberCell
    },
    {
        key: "sex",
        dataIndex: "sex",
        title: "性别",
        isSort: true,
        isEdit: true,
        editComponent: buildSelectCell([{label: "男", value: "男"}, {label: "女", value: "女"}])
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
    const [dataSource, setDataSource] = useState(initDataSource);

    const handleSave = useCallback(function(record: any) {
        // 注意handleSave缓存有助于列重计算做优化，
        // 该示例中以name为key所有name列更新不会成功
        setDataSource((__datasource) => {
            return __datasource.map((d) => {
                if (d.name === record.name) {
                    return {...d, ...record};
                }
                return d;
            });
        });
    }, []);

    return (
        <Page>
            <ProDummy initColumns={initColumns} dataSource={dataSource} mapKey={"name"} onSave={handleSave} />
        </Page>
    );
}

View.title = View.tab = "测试组件";
