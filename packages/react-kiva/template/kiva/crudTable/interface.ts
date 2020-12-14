import {ProTableProps} from "@ant-design/pro-table/lib/typing";
import {ParamsType} from "@ant-design/pro-provider";
import {ModalProps} from "antd/es/modal";
import {FormInstance} from "antd/lib/form/hooks/useForm";

export interface ICrudRecord {
    id: number,
    rowState: number
}

export interface ICurdModalHook<T> {
    beforeAdd?: () => void,
    beforeEdit?: (record: T) => void,
    onAdd?: (addRow: T) => void,
    onDelete?: (deleteRow: T) => void,
    onEdit?: (editRow: T) => void,
}

export interface ICurdModalTableProps<T extends ICrudRecord, U extends ParamsType> extends ProTableProps<T, U> {
    modalForm: FormInstance,
    modalProps?: ModalProps,
    onDataChange: (data: T[]) => void,
    hooks?: ICurdModalHook<T>,
}
