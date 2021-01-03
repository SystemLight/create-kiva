import {ReactElement, ReactNode} from "react";

export interface IDisplayConProps {
    children: ReactNode,
    display: boolean,
}

export interface ISwitchBoxProps {
    children: ReactElement<ICaseBoxProps>[],
    value: string,
}

export interface ICaseBoxProps {
    children: ReactNode,
    condition: string,
}
