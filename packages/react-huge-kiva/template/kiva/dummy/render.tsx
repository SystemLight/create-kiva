import React from "react";
import {Button, Image, Input, InputNumber, Select} from "antd";
import styled from "styled-components";

import {omit} from "../utils";
import {AsyncHydra, ISelectOptions} from "../hydra";
import {IEditCellProps, IEditCell} from "./interface";

/*
    -_-列渲染类型函数
 */
const ImageWrap = styled(Image)`
    .ant-image-img{
        max-width: 30px;
        max-height: 30px;
        object-fit: cover;
    }
`;

// 图片渲染列
export function imageRender() {
    return (value: any) => value ? (<ImageWrap style={{maxWidth: 30, maxHeight: 30}} src={value} alt={"图片"} />) : "";
}

// 小数渲染列
export function decimalRender(digits: number = 0) {
    return (value: any) => (<div style={{textAlign: "right"}}>{value.toFixed(digits)}</div>);
}

// 链接渲染列
export function linkRender(path: string, key: any) {
    return (value: any, record: any) => (
        <Button
            type={"link"}
            onClick={() => window.open(`${path}${record[key]}`, undefined, "width:800,height:600")}
        >
            {value}
        </Button>
    );
}

export class EditCell extends React.Component<IEditCellProps, any> implements IEditCell {
    focus() {
        throw new Error("focus方法未实现");
    }
}

export class InputCell extends EditCell {
    public ref = React.createRef<any>();

    focus() {
        this.ref.current.focus();
    }

    render() {
        return (
            <Input style={{width: "100%"}} ref={this.ref} {...this.props} />
        );
    }
}

export class InputNumberCell extends EditCell {
    public ref = React.createRef<any>();

    focus() {
        this.ref.current.focus();
    }

    render() {
        return (
            <InputNumber
                style={{width: "100%"}}
                ref={(what) => {
                    // @ts-ignore
                    this.ref.current = what;
                }} {...this.props}
            />
        );
    }
}

export function buildSelectCell(options: ISelectOptions) {
    return class SelectCell extends EditCell {
        public ref = React.createRef<any>();

        focus() {
            this.ref.current.focus();
        }

        render() {
            const props = omit(this.props, ["onPressEnter"]);
            return (
                <Select
                    ref={this.ref} style={{width: "100%"}}
                    {...props} options={options}
                />
            );
        }
    };
}

export function buildAsyncHydraCell(fetchOptions?: (searchValue: string) => Promise<ISelectOptions>) {
    return class SelectCell extends EditCell {
        public ref = React.createRef<any>();

        focus() {
            const {native} = this.ref.current;
            native().current.focus();
        }

        render() {
            const props = omit(this.props, ["onPressEnter"]);
            return (<AsyncHydra ref={this.ref} fetchOptions={fetchOptions} {...props} />);
        }
    };
}
