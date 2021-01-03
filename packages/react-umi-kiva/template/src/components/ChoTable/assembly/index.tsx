/**
 * proColumns预设sorter属性语法糖，传入列键值dataIndex，快速开启排序能力
 * @param {any} dataIndex
 * @return {any} result
 */
export function isSorter(dataIndex: any) {
    return (a: any, b: any) => {
        const __a = a[dataIndex];
        const __b = b[dataIndex];
        if (__a < __b) {
            return -1;
        } else if (__a > __b) {
            return 1;
        } else {
            return 0;
        }
    };
}
