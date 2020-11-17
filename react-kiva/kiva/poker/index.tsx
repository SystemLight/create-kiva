import React from "react";
import {Form} from "antd";
import {FormInstance} from "antd/es/form";
import styled from "styled-components";

import {ISelectOption} from "../hydra/interface";
import {ILabelInValueRule, IRules} from "./interface";

export const FormWrap = styled.div`
  padding: 12px 24px 7px 24px;
  background: #FBFBFB;
  border: 1px solid #D9D9D9;
  border-radius: 2px;

  .ant-row.ant-form-item{
    margin-bottom: 5px;

    .ant-col.ant-form-item-label{
        ${({$width}: {$width?: number}) => $width && `width: ${$width}px;`}
    }
  }
`;

export const SmallForm = styled(Form)`
  .ant-row.ant-form-item{
    margin-bottom: 5px;

    .ant-col.ant-form-item-label{
        ${({$width}: {$width?: number}) => $width && `width: ${$width}px;`}
    }
  }
`;

export class Poker extends React.PureComponent {
    public formRef = React.createRef<FormInstance>();
    public state: {values: any, props: any} = {
        values: {},
        props: {}
    };
    public rules: IRules<any> = {};

    form = (): FormInstance => {
        return this.formRef.current as FormInstance;
    };

    getValues = <T extends {}>(__rules: IRules<T> = {}): T => {
        const formInstance = this.formRef.current;
        if (!formInstance) {
            return {} as any;
        }
        let values = formInstance.getFieldsValue();

        const labelInValue = __rules.labelInValue || this.rules.labelInValue;
        if (labelInValue) {
            values = this.unboxLabelInValueRule(values, labelInValue);
        }

        return {...this.state.values, ...values};
    };

    setValues = <T extends {}>(values: T, __rules: IRules<T> = {}) => {
        const formInstance = this.formRef.current;
        if (!formInstance) {
            return;
        }
        this.setState({values: values});

        const labelInValue = __rules.labelInValue || this.rules.labelInValue;
        if (labelInValue) {
            formInstance.setFieldsValue(
                this.sealLabelInValueRule(values, labelInValue)
            );
            return;
        }

        formInstance.setFieldsValue(values);
    };

    setProps = <T extends {}>(key: any, values: T) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.props[key] = {...this.state.props[key], ...values};
        return this;
    };

    commitProps = () => {
        this.setState({props: {...this.state.props}});
    };

    getProps = (name: string, valuePropName?: string) => {
        return (value: any) => {
            return {[valuePropName || "value"]: value, ...this.state.props[name]};
        };
    };

    /*
        获取用于整体Poker的属性而不是单一字段子项的属性
     */
    getPokerProps = <T extends object>(name: string, defaultValue: T): T => {
        return {...defaultValue, ...this.state.props[name]};
    };

    clear = () => {
        this.formRef.current?.resetFields();
        this.setState({values: {}, props: {}});
    };

    public registerRules<T>(rules: IRules<T>) {
        this.rules = rules;
    }

    private sealLabelInValueRule = <T extends {}>(values: T, labelInValue: ILabelInValueRule<T>) => {
        const formValues = {...values};
        (Object.keys(labelInValue) as (keyof T)[]).forEach((key) => {
            (formValues[key] as any) = {
                label: formValues[labelInValue[key].labelField],
                value: formValues[key]
            };
        });
        return formValues;
    };

    private unboxLabelInValueRule = <T extends {}>(values: T, labelInValue: ILabelInValueRule<T>) => {
        (Object.keys(labelInValue) as (keyof T)[]).forEach((key) => {
            const option = (values[key] as any as ISelectOption);
            if (option) {
                values[key] = option.value;
                values[labelInValue[key].labelField] = option.label;
            } else {
                // @ts-ignore
                values[key] = 0;
                // @ts-ignore
                values[labelInValue[key].labelField] = null;
            }
        });
        return values;
    };
}

export * from "./interface";
