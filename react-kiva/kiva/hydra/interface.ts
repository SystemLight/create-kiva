import {SelectProps} from "antd/es/select";

export interface IHydraProps extends SelectProps<any> {
}

export interface IAsyncHydraProps extends SelectProps<any> {
    defaultOptions?: ISelectOptions,
    fetchOptions?: (searchValue: string) => Promise<ISelectOptions>,
}

export interface IAsyncHydraState {
    options: ISelectOptions,
    fetching: boolean,
}

export type ISelectOptions<V = any> = {label: any, value: V}[];
