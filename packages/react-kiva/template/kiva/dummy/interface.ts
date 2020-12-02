import {
    ComponentType, ClassAttributes, CSSProperties,
    Dispatch, Key, ReactElement, ReactNode, SetStateAction
} from "react";
import {TableProps} from "antd/es/table";
import {ColumnType, TableRowSelection} from "antd/es/table/interface";

import {EditCell} from "./render";

// Dummy 组件基础接口
export interface IDummyColumn<RecordType, EC extends EditCell = any> extends ColumnType<RecordType> {
    help?: keyof RecordType,
    isSort?: boolean,
    isHide?: boolean,
    isEdit?: boolean,
    isSummary?: boolean,
    isPreventClick?: boolean,
    editComponent?: EC
}

export interface IDummyRecord {
    key?: any,
    index?: number,
}

// part 组件接口
export interface ISortEndArg {
    oldIndex: number,
    newIndex: number,
}

export interface IFilterColumnProps {
    columns: IDummyColumn<any>[],
    onChange: (index: number, hide: boolean) => void,
}

export interface IActionBtnBasic {
    key: string,
    title: string,
}

export interface IComActionBtn extends IActionBtnBasic {
    type: "btn",
}

export interface IComButtonProps {
    btn: IComActionBtn,
    onRowActivate: (method: string) => void,
}

export interface IDelActionBtn extends IActionBtnBasic {
    type: "del",
    promptKey: any
}

export interface IDelButtonProps {
    btn: IDelActionBtn,
    onRowActivate: (method: string) => void,
    prompt: any,
}

export type IActionBtn = IComActionBtn | IDelActionBtn;

export type IOnRowActivate<RecordType = any> = (record: RecordType, method: string) => void

export interface IOperator<RecordType> {
    actionBtn: IActionBtn[],
    onRowActivate: IOnRowActivate<RecordType>,
    render: "dropdown" | "default"
}

// utils 接口
export type IUseDataSourceResult<RecordType> = [
    RecordType[],
    (RecordType & IDummyRecord)[],
    Dispatch<SetStateAction<RecordType[]>>
];

export type IUseColumnsResult<RecordType> = [
    IDummyColumn<RecordType>[],
    IDummyColumn<RecordType>[],
    Dispatch<SetStateAction<IDummyColumn<RecordType>[]>>
];

export type IUseRowSelectionResult<RecordType> = [
    Key[],
    Dispatch<SetStateAction<Key[]>>,
    TableRowSelection<RecordType>,
    RecordType[]
];

// LiveDummy组件接口
export interface ILiveDummyHeaderRowProps {
    children?: ReactElement[],
    onSortEnd: (props: ISortEndArg) => void,
}

export interface ILiveDummyHeaderCellProps {
    children?: ReactNode[],
    className?: string,
    colSpan?: number,
    rowSpan?: number,
    style?: CSSProperties,
    title?: string,
    __index?: number,
}

export interface ILiveDummyBodyRowProps<RecordType = any> {
    children?: ReactElement | ReactElement[],
    className?: string,
    style?: CSSProperties,
    "data-row-key"?: string,
    onRowDoubleClick: () => void,
    onRowClick: () => void,
    onRowActivate: (method: string) => void,
}

export interface ILiveDummyBodyCellProps {
    children?: ReactElement | ReactElement[],
    column?: IDummyColumn<any>,
    record?: any,
}

export interface ILiveDummyProps<RecordType> extends TableProps<RecordType> {
    initColumns: IDummyColumn<RecordType>[],
    mapKey?: keyof RecordType,
    actionBtn?: IActionBtn[],
    onRowDoubleClick?: (record: RecordType) => void,
    onRowClick?: (record: RecordType) => void,
    onRowActivate?: (record: RecordType, method: string) => void,
    rowSelection?: TableRowSelection<RecordType>,
    renderOperator?: "dropdown" | "default",
}

// ProDummy组件接口
export interface IColumnSettingProps {
    columns: IDummyColumn<any>[],
    onVisibleChange: (index: number, isHide: boolean) => void,
    onOrderChange: (oldIndex: number, newIndex: number) => void,
}

export interface ITitleProps extends IColumnSettingProps {
    leftTitle?: ReactNode,
    rightNode?: ReactNode,
}

export interface IProDummyBodyRowProps {
}

export interface IProDummyBodyCellProps {
    editable: boolean,
    editComponent: ComponentType<Partial<IEditCellProps & ClassAttributes<EditCell>>>,
    children: ReactNode,
    dataIndex: string,
    index: number,
    record: any,
    onSave: (record: any) => void,
    onSetColWidth: (dataIndex: string, width: number) => void,
}

export interface IProDummyProps<RecordType extends object = any> extends TableProps<RecordType> {
    leftTitle?: ReactNode,
    rightNode?: ReactNode,
    initColumns: IDummyColumn<RecordType>[],
    onSave?: (record: RecordType) => void,
    mapKey?: keyof RecordType,
}

export interface IEditCell {
    focus: () => void
}

export interface IEditCellProps {
    onPressEnter: () => void,
    onBlur: () => void,
    onChange: (value: any) => void,
    value: any
}

export interface IFlutterDummyProps<RecordType extends object = any> extends TableProps<RecordType> {
    leftTitle?: ReactNode,
    rightNode?: ReactNode,
    actionBtn?: IActionBtn[],
    initColumns: IDummyColumn<RecordType>[],
    mapKey?: keyof RecordType,
    onRowActivate?: (record: RecordType, method: string) => void,
    rowSelection?: TableRowSelection<RecordType>,
    renderOperator?: "dropdown" | "default",
}
