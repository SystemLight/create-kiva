import {SelectProps} from "antd/es/select";

export interface IHydraProps extends SelectProps<any> {
}

export interface IAsyncHydraProps extends SelectProps<any> {
    fetchOptions?: (searchValue: string) => Promise<ISelectOptions>,
}

export interface IAsyncHydraState {
    options: ISelectOptions,
    fetching: boolean,
}

export type ISelectOption<V = any> = {label: any, value: V}

export type ISelectOptions<V = any> = ISelectOption<V>[];
