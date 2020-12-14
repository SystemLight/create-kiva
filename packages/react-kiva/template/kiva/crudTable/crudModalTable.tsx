import React, {useState, ReactNode, useRef, useMemo} from "react";
import {Button, Popconfirm} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {ParamsType} from "@ant-design/pro-provider";
import {Key, TableRowSelection} from "antd/lib/table/interface";

import {DummyWrap} from "../dummy";
import {DragModal} from "../dragModal";
import {RowState} from "./rowState";
import {ICrudRecord, ICurdModalTableProps} from "./interface";

export function CrudModalTable<T extends ICrudRecord, U extends ParamsType>({
    modalForm, modalProps, children, hooks = {},
    onDataChange, dataSource = [], columns = [],
    ...restProps
}: ICurdModalTableProps<T, U>) {
    const {beforeAdd, beforeEdit, onAdd, onEdit, onDelete} = hooks;

    const displayDataSource = useMemo(function() {
        return dataSource.filter((v) => {
            return v.rowState !== RowState.Deleted;
        });
    }, [dataSource]);

    const displayColumns = useMemo<ProColumns[]>(function() {
        return [
            {
                title: "行号",
                dataIndex: "index",
                width: 48,
                valueType: "indexBorder"
            },
            ...columns
        ];
    }, [columns]);

    const isEdit = useRef(false);
    const row = useRef<any>(null);
    const autoID = useRef(-1);

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const rowSelection: TableRowSelection<T> = {
        fixed: true,
        type: "checkbox",
        selectedRowKeys: selectedRowKeys,
        onChange(selectedRowKeys, selectedRows) {
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    const [visible, setVisible] = useState(false);
    const [modalType, setModalType] = useState("编辑数据");

    const handleBeforeAdd = beforeAdd || function() {
    };

    const handleBeforeEdit = beforeEdit || function(record: T) {
        modalForm.setFieldsValue(record);
    };

    /**
     * 表格行属性定义
     * @param {string} record - 当前行数据
     * @return {any} property - 表格行属性内容
     */
    const onRow: any = (record: T) => ({
        onDoubleClick() {
            setModalType("编辑数据");
            setVisible(true);
            isEdit.current = true;
            row.current = record;
            handleBeforeEdit(record);
        }
    });

    /**
     * 准备添加表格行内容
     */
    const handleAddRow = () => {
        setModalType("添加数据");
        setVisible(true);
        isEdit.current = false;
        handleBeforeAdd();
    };

    /**
     * 触发删除事件
     */
    const handleDelete = () => {
        const rowRecord = row.current;
        if (onDelete) {
            onDelete({...rowRecord, rowState: RowState.Deleted});
        } else {
            onDataChange(dataSource.map((v) => {
                if (v.id === rowRecord.id) {
                    return {...v, rowState: RowState.Deleted};
                } else {
                    return v;
                }
            }));
        }
        setVisible(false);
    };

    /**
     * 触发数据修改事件
     */
    const handleMakeSure = () => {
        const record = modalForm.getFieldsValue();
        const rowRecord = row.current;
        if (isEdit.current) {
            if (onEdit) {
                onEdit({...rowRecord, ...record, rowState: RowState.Modified});
            } else {
                onDataChange(dataSource.map((v) => {
                    if (v.id === rowRecord.id) {
                        if (rowRecord.rowState === RowState.Added) {
                            return {...v, ...record};
                        } else {
                            return {...v, ...record, rowState: RowState.Modified};
                        }
                    } else {
                        return v;
                    }
                }));
            }
        } else {
            const addRow = {...record, id: autoID.current--, rowState: RowState.Added};
            if (onAdd) {
                onAdd(addRow);
            } else {
                onDataChange([...dataSource, addRow]);
            }
        }
        setVisible(false);
    };

    /**
     * 弹出框底部按钮定义
     * @return {ReactNode} component
     */
    const footer: ReactNode = (
        <div>
            {modalType === "编辑数据" && (
                <Popconfirm title={"是否确定删除？"} onConfirm={handleDelete}>
                    <Button size={"middle"} danger={true}>删除</Button>
                </Popconfirm>
            )}
            <Button size={"middle"} type={"primary"} onClick={handleMakeSure}>确定</Button>
            <Button size={"middle"} onClick={() => setVisible(false)}>取消</Button>
        </div>
    );

    /**
     * 右侧工具按钮定义
     * @return {ReactNode[]} nodeList
     */
    const toolBarRender = () => [
        <Button key="button" icon={<PlusOutlined />} type="primary" size={"middle"} onClick={handleAddRow}>
            新建
        </Button>
    ];

    return (
        <>
            <DummyWrap style={{border: "1px solid #F0F0F0"}}>
                <ProTable
                    rowClassName={(record, index) => (index % 2 === 0 ? "dummy-even-row" : "dummy-odd-row")}
                    search={false} showSorterTooltip={false} rowKey={"id"} options={{reload: false}} onRow={onRow}
                    toolBarRender={toolBarRender} rowSelection={rowSelection} dataSource={displayDataSource}
                    columns={displayColumns}
                    {...restProps}
                />
            </DummyWrap>
            {children && (
                <DragModal
                    title={modalType} visible={visible} footer={footer} onCancel={() => setVisible(false)}
                    afterClose={() => modalForm.resetFields()} {...modalProps}
                >{children}</DragModal>
            )}
        </>
    );
}
