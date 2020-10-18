import React from "react";
import {Form} from "antd";
import {FormInstance} from "antd/es/form";
import styled from "styled-components";

export const FormWrap = styled.div`
  padding: 24px;
  background: #FBFBFB;
  border: 1px solid #D9D9D9;
  border-radius: 2px;

  .ant-row.ant-form-item{
    margin-bottom: 5px;
  }
`;

export const SmallForm = styled(Form)`
  .ant-row.ant-form-item{
    margin-bottom: 5px;
  }
`;

export class Poker extends React.PureComponent {
    public formRef = React.createRef<FormInstance>();
    public state: {values: any, props: any} = {
        values: {},
        props: {}
    };

    getForm = (): FormInstance => {
        return this.formRef.current as FormInstance;
    };

    getValues = () => {
        const values = this.formRef.current?.getFieldsValue();
        return {...this.state.values, ...values};
    };

    setValues = <T extends {}>(values: T) => {
        this.setState({values: values});
        this.formRef.current?.setFieldsValue(values);
    };

    setProps = <T extends {}>(key: any, values: T) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.props[key] = {...this.state.props[key], ...values};
        return this;
    };

    commitProps = () => {
        this.setState({props: {...this.state.props}});
    };

    getProps = (name: string) => {
        return (value: any) => {
            return {value, ...this.state.props[name]};
        };
    };

    clear = () => {
        this.formRef.current?.resetFields();
        this.setState({values: {}, props: {}});
    };
}
