/*
    递归属性值，让所有属性可选，Partial类型的拓展
 */
export type RecursivePartial<T = any> = T extends object ? {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object ? RecursivePartial<T[P]> : T[P];
} : any;

/*
    去除所有非必须属性键值，TS严格模式有效
 */
export type NullableKeys<T> = { [K in keyof T]-?: undefined extends T[K] ? K : never }[keyof T]

/*
    定义字典类型
 */
export interface Dict<V = any> {
    [key: string]: V
}

/*
    将键值对对象属性类型转为any
 */
export type ConvertAny<V> = {
    [K in keyof V]: any
}

/*
    空属性对象
 */
export interface NullObject {
}
