import React from "react";
import {EllipsisOutlined} from "@ant-design/icons";
import {TableComponents} from "rc-table/lib/interface";
import {TableProps} from "antd/es/table";
import {TableRowSelection} from "antd/lib/table/interface";
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import arrayMove from "array-move";

import {
    IActionBtn, IDummyBodyCellProps,
    IDummyBodyRowProps, IDummyColumns,
    IDummySortableHeaderCellProps,
    IDummySortableHeaderRowProps
} from "./interface";
import {useDummyColumns, useMapDataSource} from "./utils";
import {defaultActionBtn} from "./part";
import {Dummy} from "./index";

// eslint-disable-next-line new-cap
export const DummyDragHandle = SortableHandle(() => (
    <EllipsisOutlined style={{cursor: "pointer", color: "#FFFFF3", position: "absolute", left: 0, top: -3}} />
));

export function DummyHeaderRow(props: IDummySortableHeaderRowProps) {
    return (<tr {...props} />);
}

// eslint-disable-next-line new-cap
export const DummySortableHeaderContainer = SortableContainer(DummyHeaderRow);

export function DummySortableHeaderRow({onSortEnd, ...restProps}: IDummySortableHeaderRowProps) {
    return (
        <DummySortableHeaderContainer useDragHandle={true} axis="x" onSortEnd={onSortEnd} {...restProps} />
    );
}

export function DummyHeaderCell({children, __index, ...restProps}: IDummySortableHeaderCellProps) {
    return (
        <th {...restProps} style={{textAlign: "center"}}>
            {__index === undefined ? undefined : <DummyDragHandle />}{children}
        </th>
    );
}

// eslint-disable-next-line new-cap
const DummySortableHeaderElement = SortableElement(DummyHeaderCell);

export function DummySortableHeaderCell(props: IDummySortableHeaderCellProps) {
    if (props.__index === undefined) {
        return (<DummyHeaderCell {...props} />);
    }
    return (
        <DummySortableHeaderElement{...props} index={props.__index} />
    );
}

export function DummyBeatenBodyRow({onRowDoubleClick, onRowClick, onRowActivate, ...restProps}: IDummyBodyRowProps) {
    if (!onRowDoubleClick) {
        return (<tr {...restProps} />);
    }

    return (
        <tr {...restProps} onDoubleClick={() => onRowDoubleClick()} onClick={() => onRowClick()} />
    );
}

export function DummyPreventClickBodyCell({columns, record, ...restProps}: IDummyBodyCellProps) {
    if (columns && !columns.isPreventClick) {
        return (<td {...restProps} />);
    } else {
        return (<td {...restProps} onClick={(e) => e.stopPropagation()} />);
    }
}

const components: TableComponents<any> = {
    header: {
        row: DummySortableHeaderRow,
        cell: DummySortableHeaderCell
    },
    body: {
        row: DummyBeatenBodyRow,
        cell: DummyPreventClickBodyCell
    }
};

export interface ISortableDummyProps<RecordType> extends TableProps<RecordType> {
    initColumns: IDummyColumns<RecordType>,
    mapKey?: keyof RecordType,
    actionBtn?: IActionBtn[],
    onRowDoubleClick?: (record: RecordType) => void,
    onRowClick?: (record: RecordType) => void,
    onRowActivate?: (record: RecordType, method: string) => void,
    rowSelection?: TableRowSelection<RecordType>,
}

export function SortableDummy<RecordType extends object = any>(
    {
        initColumns, mapKey, dataSource,
        actionBtn, onRowActivate,
        onRowDoubleClick, onRowClick,
        ...restProps
    }: ISortableDummyProps<RecordType>
) {
    const [sourceColumns, columns, setColumns] = useDummyColumns<RecordType>(initColumns,
        {
            actionBtn: (actionBtn || defaultActionBtn),
            onRowActivate(record, method) {
                onRowActivate && onRowActivate({...record}, method);
            }
        }
    );

    if (mapKey) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        dataSource = useMapDataSource<RecordType>(dataSource || [], mapKey);
    }

    const onHeaderRow = (): IDummySortableHeaderRowProps => ({
        onSortEnd({oldIndex, newIndex}) {
            setColumns(arrayMove(sourceColumns, oldIndex, newIndex));
        }
    });

    const onRow = (record: RecordType): IDummyBodyRowProps => ({
        onRowDoubleClick() {
            onRowDoubleClick && onRowDoubleClick({...record});
        },
        onRowClick() {
            onRowClick && onRowClick({...record});
        },
        onRowActivate(method) {
            onRowActivate && onRowActivate({...record}, method);
        }
    });

    return (<Dummy<RecordType>
        components={components} columns={columns}
        onHeaderRow={onHeaderRow} onRow={onRow} dataSource={dataSource}
        pagination={{showSizeChanger: true, defaultPageSize: 20, pageSizeOptions: ["20", "50", "100"]}}
        {...restProps}
    />);
}
