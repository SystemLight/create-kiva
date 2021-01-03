import {ProTableProps} from "@ant-design/pro-table/lib/typing";
import {ParamsType} from "@ant-design/pro-provider";
import {ModalProps} from "antd/es/modal";
import {FormInstance} from "antd/lib/form/hooks/useForm";

export interface IChoModalTableHook {
}

export interface ICurdModalTableProps<T, U extends ParamsType> extends ProTableProps<T, U> {
    modalForm: FormInstance,
    modalProps?: ModalProps,
    hooks?: IChoModalTableHook
}
