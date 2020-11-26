import React, {useMemo} from "react";
import {Button, Dropdown, Menu, Popconfirm} from "antd";
import {DownOutlined} from "@ant-design/icons";

import {DelButton, ComButton} from "./action";
import {IDummyRecord, IActionBtn, IOnRowActivate} from "./interface";

/*
    根据rowKeys过滤数据内容
 */
export function catchRowKeyData<RecordType>(rowKeys: any[], data: RecordType[], key: keyof RecordType) {
    return data.filter((v) => {
        const val = v[key];
        if (val) {
            return rowKeys.includes(val);
        }
        return false;
    });
}

/*
    映射dataSource添加key和index属性值
 */
export function useMapDataSource<RecordType extends object = any>(dataSource: RecordType[], keyName?: keyof RecordType): (RecordType & IDummyRecord)[] {
    return useMemo(() => {
        if (keyName) {
            return dataSource.map((v, i) => {
                return {...v, key: v[keyName], index: i + 1};
            });
        }
        return dataSource;
    }, [dataSource, keyName]);
}

/*
    处理列数据
 */
export function sorter(a: any, b: any, dataIndex: any) {
    const __a = a[dataIndex];
    const __b = b[dataIndex];
    if (__a < __b) {
        return -1;
    } else if (__a > __b) {
        return 1;
    } else {
        return 0;
    }
}

export const lineNumColumns = {
    key: "index",
    dataIndex: "index",
    title: "#",
    width: 46,
    render(value: string) {
        return (<p className="line-number">{value}</p>);
    }
};

// 渲染操作列
export function getRender(actionBtn: IActionBtn[], onRowActivate: IOnRowActivate) {
    return (text: any, record: any) => (
        <div>
            {actionBtn.map((btn) => {
                switch (btn.type) {
                    case "del":
                        return (
                            <DelButton
                                key={btn.key} btn={btn}
                                prompt={record[btn.promptKey]}
                                onRowActivate={(method) => onRowActivate(record, method)}
                            />);
                    case "btn":
                        return (
                            <ComButton
                                key={btn.key} btn={btn}
                                onRowActivate={(method) => onRowActivate(record, method)}
                            />);
                    default:
                        return undefined;
                }
            })}
        </div>
    );
}

export function getDropdownRender(actionBtn: IActionBtn[], onRowActivate: IOnRowActivate) {
    return (text: any, record: any) => {
        const overlay = (
            <Menu>
                {
                    actionBtn.map((btn) => {
                        switch (btn.type) {
                            case "btn":
                                return (
                                    <Menu.Item key={btn.key}>
                                        <Button type={"link"} onClick={() => onRowActivate(record, btn.key)}>
                                            {btn.title}
                                        </Button>
                                    </Menu.Item>
                                );
                            case "del":
                                return (
                                    <Menu.Item key={btn.key}>
                                        <Popconfirm
                                            title={`是否删除${record[btn.promptKey]}？`}
                                            onConfirm={() => onRowActivate(record, btn.key)}
                                        >
                                            <Button danger={true} type={"link"}>{btn.title}</Button>
                                        </Popconfirm>
                                    </Menu.Item>
                                );
                            default:
                                return undefined;
                        }
                    })
                }
            </Menu>
        );
        return (
            <Dropdown overlay={overlay} trigger={["click"]}>
                <Button type={"link"}>选项<DownOutlined /></Button>
            </Dropdown>
        );
    };
}
