import {CSSProperties, Dispatch, ReactElement, ReactNode, SetStateAction} from "react";
import {ColumnType, TableRowSelection} from "antd/lib/table/interface";

// Dummy 组件数据类型基类
export interface IDummyRecord {
    key?: any,
    index?: number,
}

// Dummy 传入列属性
export interface IDummyColumn<RecordType> extends ColumnType<RecordType> {
    help?: keyof RecordType,
    isSort?: boolean,
    isHide?: boolean,
    isEdit?: boolean,
    isSummary?: boolean,
    isPreventClick?: boolean,
}

export type IDummyColumns<RecordType> = IDummyColumn<RecordType>[];

export interface ISortEndArg {
    oldIndex: number,
    newIndex: number,
}

export interface IDummySortableHeaderRowProps {
    children?: ReactElement[],
    onSortEnd: (props: ISortEndArg) => void,
}

export interface IDummySortableHeaderCellProps {
    children?: ReactNode[],
    className?: string,
    colSpan?: number,
    rowSpan?: number,
    style?: CSSProperties,
    title?: string,
    __index?: number,
}

export interface IDummyBodyRowProps<RecordType = any> {
    children?: ReactElement | ReactElement[],
    className?: string,
    style?: CSSProperties,
    "data-row-key"?: string,
    onRowDoubleClick: () => void,
    onRowClick: () => void,
    onRowActivate: (method: string) => void,
}

export interface IDummyBodyCellProps {
    children?: ReactElement | ReactElement[],
    columns?: IDummyColumn<any>,
    record?: any,
}

// part组件文件，用于筛选列的组件传参
export interface IFilterColumnProps {
    columns: IDummyColumns<any>,
    onChange: (index: number, hide: boolean) => void,
}

// part组件文件，定义操作列选项
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
}

export type IUseDummyDataSourceReturn<RecordType> = [RecordType[], (RecordType & IDummyRecord)[], Dispatch<SetStateAction<RecordType[]>>];

export type IUseDummyColumnsReturn<RecordType> = [IDummyColumns<RecordType>, IDummyColumns<RecordType>, Dispatch<SetStateAction<IDummyColumns<RecordType>>>];
