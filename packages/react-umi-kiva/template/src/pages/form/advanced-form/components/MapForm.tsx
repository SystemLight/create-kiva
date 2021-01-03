import React, {useEffect} from "react";
import {Button, Form, Input} from "antd";

import {ChoFormMapSelect, formItemLayout, submitFormLayout} from "@/components/ChoForm";

const demoData = {
    idState: 0,
    textState: "禁用",
    name: "abc",
    age: 12
};

const options = [
    {label: "可用", value: 1},
    {label: "禁用", value: 0}
];

/*
    映射表单演示组件
 */
function MapForm() {
    const [formIns] = Form.useForm();

    useEffect(() => {
        formIns.setFieldsValue(demoData);
    }, []);

    const handleSubmit = () => {
        console.log(formIns.getFieldsValue());
    };

    return (
        <Form labelCol={{span: 5}} name={"map-form"} form={formIns} onSubmitCapture={handleSubmit}>
            <Form.Item {...formItemLayout} name={"name"} label={"姓名"}>
                <Input />
            </Form.Item>
            <Form.Item {...formItemLayout} name={"age"} label={"年龄"}>
                <Input />
            </Form.Item>
            <ChoFormMapSelect
                {...formItemLayout} label={"下拉映射框"}
                mapLabel={"textState"} mapValue={"idState"} formIns={formIns}
                getValueProps={(value) => ({value, options})}
            />
            <Form.Item {...submitFormLayout}>
                <div style={{textAlign: "right"}}>
                    <Button type={"primary"} htmlType={"submit"}>提交</Button>
                </div>
            </Form.Item>
        </Form>
    );
}

export default MapForm;
