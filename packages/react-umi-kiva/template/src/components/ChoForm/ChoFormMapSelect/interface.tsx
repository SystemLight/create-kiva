import {SelectProps} from "antd/es/select";
import {FormInstance} from "antd/es/form/hooks/useForm";
import {FormItemProps} from "antd/lib/form/FormItem";

export interface IMapSelectProps extends SelectProps<any> {
    mapLabel: any,
    mapValue: any,
    formIns: FormInstance
}

export interface IMapSelectFormItemProps extends FormItemProps {
    mapLabel: any,
    mapValue: any,
    formIns: FormInstance
}
