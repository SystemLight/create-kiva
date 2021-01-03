import React, {useMemo} from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";

import {IChoPresetTableProps} from "./interface";
import styles from "./style.less";

/**
 * 预设好各种值的自定义偏好antd表格
 * @param {any} columns
 * @param {any[]} restProps
 * @return {React.ReactNode} vNode
 */
export function ChoPresetTable({columns, ...restProps}: IChoPresetTableProps) {
    /**
     * 对列定义做二次修改，内置属性嵌入
     */
    const displayColumns = useMemo(() => {
        if (!columns) {
            return [];
        }
        const _columns: ProColumns[] = [
            {
                title: "行号",
                dataIndex: "index",
                width: 48,
                valueType: "indexBorder"
            },
            ...columns
        ];
        return _columns;
    }, [columns]);

    return (
        <ProTable
            rowClassName={(record, index) => (index % 2 === 0 ? "cho-table__even-row" : "cho-table__odd-row")}
            className={styles.choTable} search={false} showSorterTooltip={false} rowKey={"id"}
            scroll={{x: "max-content"}} options={{reload: false}} pagination={{defaultPageSize: 100}}
            columns={displayColumns} {...restProps}
        />
    );
}
