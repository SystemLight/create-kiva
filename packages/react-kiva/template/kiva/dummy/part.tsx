import React, {Key, ReactNode, useCallback, useMemo, useState} from "react";
import {Button, Checkbox, Dropdown, Menu, Table} from "antd";
import {RowSelectionType, TableRowSelection} from "antd/lib/table/interface";
import {FilterOutlined} from "@ant-design/icons";
import styled from "styled-components";

import {IDummyColumn, IFilterColumnProps, IUseRowSelectionResult} from "./interface";

/*
    -_-表格顶部部件，包含title和其它操作按钮
 */
export const AntTableTopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-item-left{
    }

    .title-item-right{
    }
`;

export function topBar(title?: ReactNode, operator?: ReactNode) {
    return () => (
        <AntTableTopBar>
            <div className="title-item-left">{title}</div>
            <div className="title-item-right">{operator}</div>
        </AntTableTopBar>
    );
}

export const ButtonGroup = styled(Button.Group)`
  .ant-btn{
    background-color: #FFFFFF;
    color: #6E7783;
  }

  .anticon{
    font-size: 20px;
  }
`;

/*
    -_-筛选列按钮组件
 */
export function FilterColumn({columns, onChange}: IFilterColumnProps) {
    const [visible, setVisible] = useState(false);

    const overlay = () => (
        <Menu style={{maxHeight: 300, overflowY: "auto"}}>
            {columns.map((c, i: number) => (
                <Menu.Item key={c.key}>
                    <Checkbox checked={!c.isHide} onChange={(e) => onChange(i, !e.target.checked)}>
                        {c.title}
                    </Checkbox>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown
            overlay={overlay} trigger={["click"]}
            visible={visible} onVisibleChange={(visible) => setVisible(visible)}
        >
            <Button size={"small"} type={"link"} icon={<FilterOutlined style={{color: "#BFBFBF"}} />} />
        </Dropdown>
    );
}

/*
    -_-选中行操作属性配置对象
 */
export function useRowSelection<RecordType>(type: RowSelectionType = "checkbox"): IUseRowSelectionResult<RecordType> {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<RecordType[]>([]);

    const rowSelection: TableRowSelection<RecordType> = useMemo(() => {
        const onChange = (selectedRowKeys: Key[], selectedRows: RecordType[]) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
        };
        switch (type) {
            case "checkbox":
                return {
                    selectedRowKeys: selectedRowKeys,
                    selections: [
                        Table.SELECTION_ALL,
                        Table.SELECTION_INVERT
                    ],
                    onChange: onChange
                };
            case "radio":
                return {
                    selectedRowKeys: selectedRowKeys,
                    type: "radio",
                    onChange: onChange
                };
            default:
                return {};
        }
    }, [selectedRowKeys, type]);

    return useMemo(
        () => [selectedRowKeys, setSelectedRowKeys, rowSelection, selectedRows],
        [rowSelection, selectedRowKeys, selectedRows]
    );
}

/*
    -_-定义合计拓展，用于summary属性，start定义开头空几列，end定义结尾空几列
 */
export function useSummary<RecordType>(columns: IDummyColumn<RecordType>[], start: number = 2, end: number = 1) {
    return useCallback((pageData: RecordType[]) => {
        if (!columns) {
            return undefined;
        }

        const total: number[] = [];
        let haveTotal = false;

        columns.forEach((c, i) => {
            let result = 0;
            if (c.isSummary) {
                haveTotal = true;
                pageData.forEach((data) => {
                    // @ts-ignore
                    result += Number(data[c.dataIndex]);
                });
            }
            total.push(result);
        });

        if (!haveTotal) {
            return undefined;
        }

        return (
            <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={start}>合计：</Table.Summary.Cell>
                {
                    columns.filter((c) => !c.isHide)
                        .map((c, i) => (
                            <Table.Summary.Cell key={i} index={i} colSpan={1}>
                                {c.isSummary ? total[i] : ""}
                            </Table.Summary.Cell>
                        ))
                }
                {
                    new Array(end).fill(null).map((c, i) => (
                        <Table.Summary.Cell key={i} index={i} colSpan={1}>
                        </Table.Summary.Cell>
                    ))
                }
            </Table.Summary.Row>
        );
    }, [columns, end, start]);
}
