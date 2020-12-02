import "./proDummy.style.less";

import React, {useMemo, useState} from "react";
import {Card, Table} from "antd";
import {ColumnType} from "antd/es/table/interface";

import {arrayMove} from "../utils";
import {getDropdownRender, getRender, lineNumColumns, sorter, useMapDataSource} from "./utils";
import {IDummyColumn, IFlutterDummyProps} from "./interface";
import {Title, defaultProps, ProDummyWrap} from "./proDummy";
import {defaultActionBtn} from "./action";

function upgradeColumn<RecordType = any>(v: IDummyColumn<RecordType>, i: number): ColumnType<RecordType> {
    if (v.isSort) {
        v.sortDirections = ["descend", "ascend"];
        v.sorter = (a: any, b: any) => sorter(a, b, v.dataIndex);
    }

    v.shouldCellUpdate = (record: RecordType, preRecord: RecordType) => {
        return record !== preRecord;
    };

    return v;
}

export function FlutterDummy<RecordType extends object = any>(
    {
        leftTitle, rightNode, initColumns, dataSource,
        mapKey, actionBtn, renderOperator, onRowActivate, ...restProps
    }: IFlutterDummyProps<RecordType>
) {
    const [pureColumns, setColumns] = useState<IDummyColumn<RecordType>[]>(initColumns);
    const columns = useMemo<IDummyColumn<RecordType>[]>(() => {
        let newColumns = [...pureColumns];

        newColumns = newColumns.filter((v) => !v.isHide);
        newColumns = newColumns.map(upgradeColumn);
        newColumns.unshift(lineNumColumns);

        const action = actionBtn || defaultActionBtn;
        if (action.length === 0 || !onRowActivate) {
            return newColumns;
        }

        const render = renderOperator || "dropdown";
        if (render === "default") {
            newColumns.push({
                key: "operator",
                dataIndex: "operator",
                title: "操作",
                width: 25 * action.reduce((v1, v2) => v1 + v2.title.length, 0),
                render: getRender(action, onRowActivate)
            });
        } else if (render === "dropdown") {
            newColumns.push({
                key: "operator",
                dataIndex: "operator",
                title: "操作",
                width: 50,
                render: getDropdownRender(action, onRowActivate)
            });
        }

        return newColumns;
    }, [pureColumns, onRowActivate]);
    const __dataSource = useMapDataSource<RecordType>(dataSource || [], mapKey);

    function onVisibleChange(index: number, isHide: boolean) {
        pureColumns[index].isHide = isHide;
        setColumns([...pureColumns]);
    }

    function onOrderChange(oldIndex: number, newIndex: number) {
        setColumns(arrayMove(pureColumns, oldIndex, newIndex));
    }

    const title = () => (
        <Title
            leftTitle={leftTitle} rightNode={rightNode} columns={pureColumns}
            onVisibleChange={onVisibleChange} onOrderChange={onOrderChange}
        />
    );

    return (
        <Card bodyStyle={{paddingTop: 0, paddingBottom: 0}}>
            <ProDummyWrap>
                <Table<RecordType>
                    {...defaultProps} {...restProps} columns={columns} dataSource={__dataSource} title={title}
                />
            </ProDummyWrap>
        </Card>
    );
}
