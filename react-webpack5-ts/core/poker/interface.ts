export interface IFormItemProps<V, T = V> {
    id?: string,
    value?: V,
    onChange?: (value: T) => void,
}
