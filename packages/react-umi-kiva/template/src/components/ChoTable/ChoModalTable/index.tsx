import React, {useState, ReactNode} from "react";
import {Button, Popconfirm} from "antd";
import {PlusOutlined} from "@ant-design/icons";

import {ChoPresetTable} from "../ChoPresetTable";
import {ChoModal} from "../../ChoModal";
import {ICurdModalTableProps} from "./interface";

/**
 * 自带弹窗编辑的antd表格
 * @param {any} modalForm
 * @param {any} modalProps
 * @return {React.ReactNode} vNode
 */
export function ChoModalTable({modalForm, modalProps}: ICurdModalTableProps<any, any>) {
    const [visible, setVisible] = useState(false);
    const [modalType, setModalType] = useState("编辑数据");

    /**
     * 添加表格行内容
     */
    const handleAddRow = () => {
        setVisible(true);
        setModalType("添加数据");
    };

    /**
     * 表格行属性定义
     * @param {string} record - 当前行数据
     * @return {any} property - 表格行属性内容
     */
    const onRow: any = (record: any) => ({
        onDoubleClick() {
            setVisible(true);
            setModalType("编辑数据");
            modalForm.setFieldsValue(record);
        }
    });

    /**
     * 右侧工具按钮定义
     * @return {ReactNode[]} nodeList
     */
    const toolBarRender = () => [
        <Button key="button" icon={<PlusOutlined />} type="primary" size={"middle"} onClick={handleAddRow}>
            新建
        </Button>
    ];

    /**
     * 弹出框底部按钮定义
     * @return {ReactNode} component
     */
    const footer: ReactNode = (
        <div>
            {modalType === "编辑数据" && (
                <Popconfirm title={"是否确定删除？"}>
                    <Button size={"middle"} danger={true}>删除</Button>
                </Popconfirm>
            )}
            <Button size={"middle"} type={"primary"}>确定</Button>
            <Button size={"middle"} onClick={() => setVisible(false)}>取消</Button>
        </div>
    );

    return (
        <>
            <ChoPresetTable />
            <ChoModal />
        </>
    );
}
