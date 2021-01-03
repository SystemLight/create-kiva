import React, {PropsWithChildren, useState, ReactNode, SyntheticEvent} from "react";
import {Modal} from "antd";
import {ModalProps} from "antd/es/modal";
import Draggable from "react-draggable";
import {Resizable, ResizeCallbackData} from "react-resizable";

import styles from "./style.less";

/**
 * 默认开启拖拽和拉伸功能的antd Modal框
 * @param {string} title
 * @param {any[]} restProps
 * @return {React.ReactNode} vNode
 */
export function ChoModal({title, ...restProps}: PropsWithChildren<ModalProps>) {
    const [disabled, setDisabled] = useState(true);
    const [width, setWidth] = useState(520);
    const [offset, setOffset] = useState(0);

    const modalTitle = (
        <div
            style={{width: "100%", cursor: "move"}}
            onMouseOver={() => disabled && setDisabled(false)}
            onMouseOut={() => setDisabled(true)}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => void 0}
            onBlur={() => void 0}
        >{title}</div>
    );

    const handle = (
        <span
            className={`react-resizable-handle ${offset && "active"}`}
            style={{transform: `translateX(${offset}px)`}}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        />
    );

    const onResize = (e: SyntheticEvent, {size}: ResizeCallbackData) => {
        setOffset(size.width - width);
    };

    const onResizeStop = (e: SyntheticEvent, data: ResizeCallbackData) => {
        setOffset(0);
        setWidth(data.size.width);
    };

    const modalRender = (node: ReactNode) => (
        <Draggable disabled={disabled}>
            <Resizable
                className={styles.resizeModal}
                width={width + offset} height={0} handle={handle}
                draggableOpts={{enableUserSelectHack: false}}
                onResize={onResize} onResizeStop={onResizeStop}
            >{node}</Resizable>
        </Draggable>
    );

    return (
        <Modal
            title={modalTitle} okButtonProps={{size: "large"}} cancelButtonProps={{size: "large"}}
            modalRender={modalRender} maskClosable={false} width={width}
            {...restProps}
        />
    );
}
