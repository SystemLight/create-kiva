import {ISelectOption} from "./interface";

/*
    将后端传来的数组数据映射成antd select可以接收的options数据类型
 */
export function mapAntdOptions<T extends object = any>(
    sourceObj: T[], labelFiled: keyof T, valueFiled: keyof T
): ISelectOption[] {
    return sourceObj.map((v) => {
        return {
            label: v[labelFiled],
            value: v[valueFiled]
        };
    });
}
