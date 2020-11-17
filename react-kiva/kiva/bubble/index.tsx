import React, {ReactNode, useMemo, useRef, useState} from "react";
import ReactDOM from "react-dom";
import Icon from "@ant-design/icons";
import Draggable from "react-draggable";
import styled from "styled-components";

import {ReactComponent as Kiva} from "./kiva.svg";
import {ReactComponent as Close} from "./close.svg";

const BubbleWrap = styled.div`
  position: fixed;
  z-index: 9999;
  bottom: 30px;
  right: 60px;
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #4C4C61;

  .icon{
    position: absolute;
    font-size: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .panel{
     position: absolute;
     background-color: #17171F;
     right: 0;
     bottom: 72px;
     width: 68vw;
     height: 80vh;
  }
`;

function BubbleCore({children}: {children?: ReactNode}) {
    const [visible, setVisible] = useState(false);
    const delay = useRef<number>(0);

    const onMouseDown = () => {
        delay.current = new Date().getTime();
    };

    const onMouseUp = () => {
        const now = new Date().getTime();
        if (now - delay.current < 300) {
            setVisible(!visible);
        }
    };

    return (
        <Draggable>
            <BubbleWrap>
                <div className={"icon"}>
                    <Icon component={visible ? Close : Kiva} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
                </div>
                {visible && <div className={"panel"}>{children}</div>}
            </BubbleWrap>
        </Draggable>
    );
}

export function Bubble(props: {children?: ReactNode}) {
    const bubbleNode = useMemo<Element>(() => {
        let _bubbleNode = document.getElementById("kiva-bubble");
        if (!_bubbleNode) {
            _bubbleNode = document.createElement("div");
            _bubbleNode.id = "kiva-bubble";
            document.body.appendChild(_bubbleNode);
        }
        return _bubbleNode;
    }, []);

    return ReactDOM.createPortal(<BubbleCore {...props} />, bubbleNode);
}

Bubble.Core = BubbleCore;

Bubble.renderBubble = function(children?: ReactNode) {
    let bubbleNode = document.getElementById("kiva-bubble");
    if (bubbleNode) {
        ReactDOM.unmountComponentAtNode(bubbleNode);
    } else {
        bubbleNode = document.createElement("div");
        bubbleNode.id = "kiva-bubble";
        document.body.appendChild(bubbleNode);
    }
    ReactDOM.render(<BubbleCore>{children}</BubbleCore>, bubbleNode);
};
