import React, {useMemo, useState} from "react";
import {ColumnType} from "antd/lib/table/interface";
import {Button, Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

import {
    IDummyRecord, IDummySortableHeaderCellProps,
    IDummyColumn, IDummyColumns, IOperator,
    IDelButtonProps, IComButtonProps, IDummyBodyCellProps,
    IActionBtn, IOnRowActivate, IUseDummyDataSourceReturn,
    IUseDummyColumnsReturn
} from "./interface";

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
    映射数据成为Dummy可用数据类型
 */
export function mapDataSource<RecordType extends IDummyRecord>(dataSource: RecordType[], keyName: keyof RecordType) {
    return dataSource.map((v, i) => {
        return {...v, key: v[keyName], index: i + 1};
    });
}

export function useMapDataSource<RecordType extends IDummyRecord>(dataSource: RecordType[], keyName: keyof RecordType) {
    return useMemo(() => mapDataSource<RecordType>(dataSource, keyName), [dataSource, keyName]);
}

export function useDummyDataSource<RecordType>(keyName: keyof RecordType): IUseDummyDataSourceReturn<RecordType> {
    const [pureDataSource, setDataSource] = useState<RecordType[]>([]);
    const dataSource = useMapDataSource<RecordType>(pureDataSource, keyName);
    return [pureDataSource, dataSource, setDataSource];
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

export function upgradeColumn<RecordType = any>(v: IDummyColumn<RecordType>, i: number): ColumnType<RecordType> {
    if (v.isSort) {
        v.sortDirections = ["descend", "ascend"];
        v.sorter = (a: any, b: any) => sorter(a, b, v.dataIndex);
    }

    v.onHeaderCell = (): IDummySortableHeaderCellProps => ({__index: i});
    v.onCell = (data): IDummyBodyCellProps => ({columns: v, record: data});

    return v;
}

export const lineNumColumns = {
    key: "index",
    dataIndex: "index",
    title: "行号",
    width: 46,
    render(value: string) {
        return (<b className="line-number">{value}</b>);
    }
};

export const defaultActionBtn: IActionBtn[] = [
    {key: "edit", title: "编辑", type: "btn"},
    {key: "delete", title: "删除", type: "del", promptKey: "Name"}
];

export function DelButton({btn, onRowActivate, prompt}: IDelButtonProps) {
    return (
        <Button
            style={{padding: "0 5px"}} type="link" danger={true}
            onClick={(e) => {
                e.stopPropagation();
                Modal.confirm({
                    title: "提示",
                    icon: <ExclamationCircleOutlined/>,
                    content: `是否确认删除${prompt}？`,
                    okText: "确认",
                    cancelText: "取消",
                    okButtonProps: {size: "large"},
                    cancelButtonProps: {size: "large"},
                    onOk() {
                        onRowActivate(btn.key);
                    }
                });
            }}
        >{btn.title}</Button>
    );
}

export function ComButton({btn, onRowActivate}: IComButtonProps) {
    return (
        <Button
            style={{padding: "0 5px"}} type="link"
            onClick={(e) => {
                e.stopPropagation();
                onRowActivate(btn.key);
            }}
        >{btn.title}</Button>
    );
}

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

export function useColumnsPlus<RecordType>(columns: IDummyColumns<RecordType>, operator: IOperator<RecordType>) {
    return useMemo<IDummyColumns<RecordType>>(() => {
        let newColumns = [...columns];

        newColumns = newColumns.filter((v) => !v.isHide);
        newColumns = newColumns.map(upgradeColumn);
        newColumns.unshift(lineNumColumns);

        const {actionBtn, onRowActivate} = operator;
        newColumns.push({
            key: "operator",
            dataIndex: "operator",
            title: "操作",
            width: 25 * actionBtn.reduce((v1, v2) => v1 + v2.title.length, 0),
            render: getRender(actionBtn, onRowActivate)
        });

        return newColumns;
    }, [columns, operator]);
}

export function useDummyColumns<RecordType>(initCol: IDummyColumns<RecordType>, operator: IOperator<RecordType>): IUseDummyColumnsReturn<RecordType> {
    const [pureColumns, setColumns] = useState<IDummyColumns<RecordType>>(initCol);
    const columns = useColumnsPlus<RecordType>(pureColumns, operator);
    return [pureColumns, columns, setColumns];
}
