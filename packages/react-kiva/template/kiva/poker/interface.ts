export interface IFormItemProps<V, T = V> {
    id?: string,
    value?: V,
    onChange?: (value: T) => void,
}

export type ILabelInValueRule<T> = {
    [K in keyof T]: {labelField: keyof T}
}

export interface IRules<T> {
    labelInValue?: ILabelInValueRule<Partial<T>>
}
