import React, {Dispatch, Key, ReactNode, SetStateAction, useCallback, useMemo, useState} from "react";
import {Button, Checkbox, Dropdown, Image, Menu, Modal, Table} from "antd";
import {RowSelectionType, TableRowSelection} from "antd/es/table/interface";
import {ExclamationCircleOutlined, FilterOutlined} from "@ant-design/icons";
import styled from "styled-components";

import {IActionBtn, IComButtonProps, IDelButtonProps, IDummyColumns, IFilterColumnProps} from "./interface";

/*
    -_-列渲染类型函数
 */
const ImageWrap = styled(Image)`
    .ant-image-img{
        max-width: 30px;
        max-height: 30px;
        object-fit: cover;
    }
`;

export function imageRender() {
    return (value: any) => value ? (
        <ImageWrap style={{maxWidth: 30, maxHeight: 30}} src={value} alt={"图片"} />
    ) : "";
}

export function decimalRender(digits: number = 0) {
    return (value: any) => <div style={{textAlign: "right"}}>{value.toFixed(digits)}</div>;
}

/*
    默认激活按钮
 */
export function DelButton({btn, onRowActivate, prompt}: IDelButtonProps) {
    return (
        <Button
            style={{padding: "0 5px"}} type="link" danger={true}
            onClick={(e) => {
                e.stopPropagation();
                Modal.confirm({
                    title: "提示",
                    icon: <ExclamationCircleOutlined />,
                    content: `是否确认删除${prompt}？`,
                    okText: "确认",
                    cancelText: "取消",
                    okButtonProps: {size: "large"},
                    cancelButtonProps: {size: "large"},
                    onOk() {
                        onRowActivate(btn.key);
                    }
                });
            }}
        >{btn.title}</Button>
    );
}

export function ComButton({btn, onRowActivate}: IComButtonProps) {
    return (
        <Button
            style={{padding: "0 5px"}} type="link"
            onClick={(e) => {
                e.stopPropagation();
                onRowActivate(btn.key);
            }}
        >{btn.title}</Button>
    );
}

export const defaultActionBtn: IActionBtn[] = [
    {key: "edit", title: "编辑", type: "btn"},
    {key: "delete", title: "删除", type: "del", promptKey: "Name"}
];

/*
    -_-表格顶部部件，包含title和其它操作按钮
 */
const AntTableTopBar = styled.div`
    display: flex;
    justify-content: space-between;

    .title-item-left{

    }

    .title-item-right{
      margin-right: 16px;
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
export type IUseRowSelectionReturn<RecordType> = [Key[], Dispatch<SetStateAction<Key[]>>, TableRowSelection<RecordType>];

export function useRowSelection<RecordType>(type: RowSelectionType = "checkbox"): IUseRowSelectionReturn<RecordType> {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const rowSelection: TableRowSelection<RecordType> = useMemo(() => {
        const onChange = (selectedRowKeys: Key[], selectedRows: RecordType[]) => setSelectedRowKeys(selectedRowKeys);
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
    return [selectedRowKeys, setSelectedRowKeys, rowSelection];
}

/*
    -_-定义合计拓展，用于summary属性
 */
export function useSummary<RecordType>(columns: IDummyColumns<RecordType>, start: number = 2, end: number = 1) {
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
