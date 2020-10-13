import "./style.less";

import React, {useContext, useState, useRef, useEffect} from "react";
import {Table, Form, Input} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";
import {TableProps} from "antd/lib/table/Table";
import {TableComponents} from "rc-table/lib/interface";
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import arrayMove from "array-move";

import {
    IDummyProps, IDummyRecord, IDummyPlusPhantom, IDummyPhantomBodyRowProps,
    IDummyPlusProps, IDummySortableHeaderRowProps, IOperator,
    IDummyBodyRowProps, IDummyBodyCellProps, IDummySortableHeaderCellProps
} from "./interface";
import {useSummary} from "./part";
import {useDummyColumns, defaultActionBtn} from "./utils";

const basicTableProps: TableProps<any> = {
    className: "dummy-table", bordered: true, size: "small", scroll: {x: "max-content"},
    rowClassName(record, index?: number) {
        return index ? index % 2 === 0 ? "dummy-even-row" : "dummy-odd-row" : "dummy-even-row";
    }
};

export default function Dummy<RecordType extends IDummyRecord>(props: IDummyProps<RecordType>) {
    return (<Table<RecordType> {...basicTableProps} {...props}/>);
}

/*
    -_-拖拽排序列头部组件
 */
// eslint-disable-next-line new-cap
export const DummyDragHandle = SortableHandle((props: any) => (
    <EllipsisOutlined style={{cursor: "pointer", color: "#FFFFF3", position: "absolute", left: 0, top: -3}}/>
));

export function DummyHeaderRow(props: IDummySortableHeaderRowProps) {
    return (<tr {...props}/>);
}

// eslint-disable-next-line new-cap
export const DummySortableHeaderContainer = SortableContainer(DummyHeaderRow);

export function DummySortableHeaderRow({onSortEnd, ...restProps}: IDummySortableHeaderRowProps) {
    return (
        <DummySortableHeaderContainer useDragHandle={true} axis="x" onSortEnd={onSortEnd} {...restProps}/>
    );
}

export function DummyHeaderCell({children, __index, ...restProps}: IDummySortableHeaderCellProps) {
    return (
        <th {...restProps} style={{textAlign: "center"}}>
            {__index === undefined ? undefined : <DummyDragHandle/>}{children}
        </th>
    );
}

// eslint-disable-next-line new-cap
const DummySortableHeaderElement = SortableElement(DummyHeaderCell);

export function DummySortableHeaderCell(props: IDummySortableHeaderCellProps) {
    if (props.__index === undefined) {
        return (<DummyHeaderCell {...props}/>);
    }
    return (
        <DummySortableHeaderElement{...props} index={props.__index}/>
    );
}

/*
    -_-表格body自定义组件
 */
export function DummyBeatenBodyRow({onRowDoubleClick, onRowClick, onRowActivate, ...restProps}: IDummyBodyRowProps) {
    if (!onRowDoubleClick) {
        return (<tr {...restProps}/>);
    }

    return (
        <tr {...restProps} onDoubleClick={() => onRowDoubleClick()} onClick={() => onRowClick()}/>
    );
}

export function DummyPreventClickBodyCell({columns, record, ...restProps}: IDummyBodyCellProps) {
    if (columns && !columns.isPreventClick) {
        return (<td {...restProps}/>);
    } else {
        return (<td {...restProps} onClick={(e) => e.stopPropagation()}/>);
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

export function DummyPlus<RecordType extends IDummyRecord>(
    {
        defaultColumns, actionBtn, onRowActivate,
        onRowDoubleClick, onRowClick,
        ...restProps
    }: IDummyPlusProps<RecordType>
) {
    const operator: IOperator<RecordType> = {
        actionBtn: (actionBtn || defaultActionBtn),
        onRowActivate(record, method) {
            onRowActivate && onRowActivate({...record}, method);
        }
    };
    const [sourceColumns, columns, setColumns] = useDummyColumns<RecordType>(defaultColumns, operator);
    const summary = useSummary<RecordType>(sourceColumns);

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
        size="small" components={components} columns={columns}
        onHeaderRow={onHeaderRow} onRow={onRow} summary={summary}
        pagination={{showSizeChanger: true, defaultPageSize: 20, pageSizeOptions: ["20", "50", "100"]}}
        {...restProps}
    />);
}

/*
    -_-幻影表格body自定义组件
 */
const EditableContext = React.createContext<any>({});

export function DummyEditBodyRow({onSave, ...restProps}: IDummyPhantomBodyRowProps) {
    const [form] = Form.useForm();

    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={{form, onSave}}>
                <tr {...restProps}/>
            </EditableContext.Provider>
        </Form>
    );
}

export function DummyEditBodyCell({columns, record, children, ...restProps}: IDummyBodyCellProps) {
    const {form, onSave} = useContext(EditableContext);
    const inputRef = useRef<any>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue(record);
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            onSave({...record, ...values});
        } catch (errInfo) {
            console.error("Save failed:", errInfo);
        }
    };

    let childNode = children;
    if (columns?.isEdit) {
        childNode = editing ? (
            <Form.Item style={{margin: 0}} name={columns.dataIndex}>
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div style={{padding: "5px 24px 5px 12px", cursor: "pointer"}} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
}

const phantomComponents: TableComponents<any> = {
    header: {
        row: DummySortableHeaderRow,
        cell: DummySortableHeaderCell
    },
    body: {
        row: DummyEditBodyRow,
        cell: DummyEditBodyCell
    }
};

export function DummyPhantom<RecordType>({onSave, ...restProps}: IDummyPlusPhantom<RecordType>) {
    const onRow = (): IDummyPhantomBodyRowProps => ({
        onSave(saveRecord) {
            onSave && onSave(saveRecord);
        }
    });

    return (<DummyPlus<RecordType> components={phantomComponents} onRow={onRow} {...restProps}/>);
}
