import React, {useState} from "react";

import {Button, Card, Tooltip} from "antd";
import {CardProps} from "antd/lib/card";
import {AppstoreTwoTone, CopyOutlined, FullscreenExitOutlined, FullscreenOutlined} from "@ant-design/icons";
import styled from "styled-components";

const ButtonGroup = styled(Button.Group)`
    .ant-btn {
        background-color: #FFFFFF;
        color: #6E7783;
    }

    .anticon {
        font-size: 20px;
    }
`;

/*
    系统主要内容部分Wrap组件，卡片风格
 */
export function Page({title, extra, ...restProps}: CardProps) {
    const [fullScreen, setFullScreen] = useState(false);
    const _extra = (
        <ButtonGroup>
            <Tooltip placement={"bottom"} title={"页面分身"}>
                <Button size={"small"} type={"text"} onClick={() => window.open(location.href)}>
                    <CopyOutlined />
                </Button>
            </Tooltip>
            <Button size={"small"} type={"text"} onClick={() => setFullScreen(!fullScreen)}>
                {fullScreen ?
                    <FullscreenExitOutlined /> :
                    <FullscreenOutlined />
                }
            </Button>
            {extra}
        </ButtonGroup>
    );
    return (
        <Card
            extra={_extra} size={"small"}
            title={<><AppstoreTwoTone style={{fontSize: 20, verticalAlign: "middle", marginRight: 8}} />{title}</>}
            style={fullScreen ? {position: "fixed", left: 0, right: 0, bottom: 0, top: 0, zIndex: 10000} : {}}
            {...restProps}
        />
    );
}
