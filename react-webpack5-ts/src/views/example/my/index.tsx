import React, {useState} from "react";
import styled from "styled-components";
import {AxiosResponse} from "axios";

import {useObserved} from "@c/useHooks";
import {useAxios} from "@c/ajax";
import {MemoText} from "./memoText";

export const SRect = styled.div`
    width: 100px;
    height: 100px;
    line-height: 100px;
    white-space: nowrap;
    color: white;
    overflow: hidden;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    user-select: none;
    cursor: pointer;
    background-color: #50504D;
    box-shadow: #333333 0 0 5px 1px;
    text-shadow: #333333 5px 5px 5px;

    &:hover{
        color: #2F6036;
        background-color: #4E78C1;
    }
`;

export default function MyPage() {
    useObserved("MyPage");

    const [text, setText] = useState("初始内容");
    const {run, loading, error} = useAxios<AxiosResponse>({
        service(req) {
            return req.get("https://jsonplaceholder.typicode.com/todos/1");
        }
    });

    const onClick = () => {
        setText(new Date().toString());
        run().then((data) => {
            console.log(data);
        });
    };

    return (
        <div>
            {loading ? "loading..." : text}
            <SRect onClick={onClick}>
                <MemoText />
            </SRect>
        </div>
    );
}
