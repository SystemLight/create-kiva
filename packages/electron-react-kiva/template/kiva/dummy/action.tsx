import React from "react";
import {Button, Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

import {IActionBtn, IComButtonProps, IDelButtonProps} from "./interface";

export function DelButton({btn, onRowActivate, prompt}: IDelButtonProps) {
    return (
        <Button
            style={{padding: "0 5px"}} type="link" danger={true}
            onClick={(e) => {
                e.stopPropagation();
                Modal.confirm({
                    title: "提示",
                    icon: <ExclamationCircleOutlined />,
                    content: `是否确认删除${prompt || ""}？`,
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
    {key: "delete", title: "删除", type: "del", promptKey: "name"}
];
