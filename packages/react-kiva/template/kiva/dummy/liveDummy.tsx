import React, {useMemo, useState} from "react";
import {EllipsisOutlined} from "@ant-design/icons";
import {ColumnType} from "antd/es/table/interface";
import {TableComponents} from "rc-table/lib/interface";
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";

import {arrayMove} from "../utils";
import {Dummy} from "./core";
import {getDropdownRender, getRender, lineNumColumns, sorter, useMapDataSource} from "./utils";
import {defaultActionBtn} from "./action";
import {
    ILiveDummyHeaderRowProps, ILiveDummyHeaderCellProps, ILiveDummyBodyRowProps,
    ILiveDummyBodyCellProps, ILiveDummyProps, IDummyColumn
} from "./interface";

/* eslint-disable new-cap */

const DragHandle = SortableHandle(() => (
    <EllipsisOutlined style={{cursor: "pointer", color: "#FFFFF3", position: "absolute", left: 0, top: -3}} />
));

const HeaderContainer = SortableContainer(function(props: ILiveDummyHeaderRowProps) {
    return (<tr {...props} />);
});

function HeaderRow({onSortEnd, ...restProps}: ILiveDummyHeaderRowProps) {
    return (<HeaderContainer useDragHandle={true} axis="x" onSortEnd={onSortEnd} {...restProps} />);
}

function SourceHeaderCell({children, __index, ...restProps}: ILiveDummyHeaderCellProps) {
    return (
        <th {...restProps} style={{textAlign: "center"}}>
            {__index === undefined ? undefined : <DragHandle />}{children}
        </th>
    );
}

const HeaderElement = SortableElement(SourceHeaderCell);

function HeaderCell(props: ILiveDummyHeaderCellProps) {
    if (props.__index === undefined) {
        return (<SourceHeaderCell {...props} />);
    }
    return (<HeaderElement{...props} index={props.__index} />);
}

function BodyRow({onRowDoubleClick, onRowClick, onRowActivate, ...restProps}: ILiveDummyBodyRowProps) {
    if (!onRowDoubleClick) {
        return (<tr {...restProps} />);
    }
    return (
        <tr {...restProps} onDoubleClick={() => onRowDoubleClick()} onClick={() => onRowClick()} />
    );
}

function BodyCell({column, record, ...restProps}: ILiveDummyBodyCellProps) {
    if (column && !column.isPreventClick) {
        return (<td {...restProps} />);
    } else {
        return (<td {...restProps} onClick={(e) => e.stopPropagation()} />);
    }
}

const components: TableComponents<any> = {
    header: {
        row: HeaderRow,
        cell: HeaderCell
    },
    body: {
        row: BodyRow,
        cell: BodyCell
    }
};

function upgradeColumn<RecordType = any>(v: IDummyColumn<RecordType>, i: number): ColumnType<RecordType> {
    if (v.isSort) {
        v.sortDirections = ["descend", "ascend"];
        v.sorter = (a: any, b: any) => sorter(a, b, v.dataIndex);
    }

    v.shouldCellUpdate = (record: RecordType, preRecord: RecordType) => {
        return record !== preRecord;
    };

    v.onHeaderCell = (): ILiveDummyHeaderCellProps => ({__index: i});
    v.onCell = (data): ILiveDummyBodyCellProps => ({column: v, record: data});

    return v;
}

/*
    交互表格：
        1. 列排序
        2. 行号添加和key值映射
        3. 外部触发列隐藏功能
        4. 渲染操作列，提供两种渲染模式，操作列事件回传
        5. 列头拖拽排序
        6. 单行点击，单行双击事件反馈
 */
export function LiveDummy<RecordType extends object = any>(
    {
        initColumns, dataSource, mapKey, renderOperator, actionBtn, onActionActivate,
        onRowDoubleClick, onRowClick, onRowActivate, ...restProps
    }: ILiveDummyProps<RecordType>
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

    const onHeaderRow = (): ILiveDummyHeaderRowProps => ({
        onSortEnd({oldIndex, newIndex}) {
            if (oldIndex !== newIndex) {
                setColumns(arrayMove(pureColumns, oldIndex, newIndex));
            }
        }
    });

    const onRow = (record: RecordType): ILiveDummyBodyRowProps => ({
        onRowClick() {
            onRowClick && onRowClick({...record});
        },
        onRowDoubleClick() {
            onRowDoubleClick && onRowDoubleClick({...record});
        },
        onRowActivate(method) {
            onRowActivate && onRowActivate({...record}, method);
        }
    });

    return (
        <Dummy<RecordType>
            {...restProps}
            components={components} columns={columns} dataSource={__dataSource}
            onHeaderRow={onHeaderRow} onRow={onRow}
            pagination={{showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["20", "50", "100"]}}
        />
    );
}
