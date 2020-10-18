import React, {PropsWithChildren, useState} from "react";
import {Modal} from "antd";
import {ModalProps} from "antd/es/modal";
import Draggable from "react-draggable";

export function DragModal({title, ...restProps}: PropsWithChildren<ModalProps>) {
    const [disabled, setDisabled] = useState(true);

    const modalTitle = (
        <div
            style={{
                width: "100%",
                cursor: "move"
            }}
            onMouseOver={() => {
                disabled && setDisabled(false);
            }}
            onMouseOut={() => {
                setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {
            }}
            onBlur={() => {
            }}
        >
            {title}
        </div>
    );

    return (
        <Modal
            title={modalTitle} okButtonProps={{size: "large"}} cancelButtonProps={{size: "large"}}
            // @ts-ignore
            modalRender={(modal) => <Draggable disabled={disabled}>{modal}</Draggable>}
            {...restProps}
        />
    );
}
