import React, {PropsWithChildren, useState, ReactNode, SyntheticEvent} from "react";
import {Modal} from "antd";
import {ModalProps} from "antd/es/modal";
import Draggable from "react-draggable";
import {Resizable, ResizeCallbackData} from "react-resizable";
import styled from "styled-components";

const ResizeModalWrap = styled(Resizable)`
    .react-resizable-handle {
        position: absolute;
        width: 10px;
        height: 100%;
        bottom: 0;
        right: -5px;
        cursor: col-resize;
        z-index: 1;
        background-image: none;

        &.active::before {
            content: '';
            position: absolute;
            pointer-events: auto;
            left: 50%;
            top: 0;
            bottom: 0;
            border-left: solid 1px black;
        }
    }
`;

export function DragModal({title, ...restProps}: PropsWithChildren<ModalProps>) {
    const [disabled, setDisabled] = useState(true);
    const [width, setWidth] = useState(520);
    const [offset, setOffset] = useState(0);

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
            <ResizeModalWrap
                width={width + offset} height={0} handle={handle}
                draggableOpts={{enableUserSelectHack: false}}
                onResize={onResize}
                onResizeStop={onResizeStop}
            >
                {node}
            </ResizeModalWrap>
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
