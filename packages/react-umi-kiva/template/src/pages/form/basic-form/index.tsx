import React from "react";
import {
    Button, Card, Form, Input, InputNumber, Radio, Checkbox,
    Select, Switch, DatePicker, TimePicker, AutoComplete,
    Slider, Rate, Upload
} from "antd";
import {UploadOutlined, InboxOutlined} from "@ant-design/icons";
import {PageContainer, FooterToolbar} from "@ant-design/pro-layout";

import {formItemLayout} from "@/components/ChoForm";

function BasicForm() {
    return (
        <PageContainer content={"表单页用于向用户收集或验证信息，基础组件可以实现单字段数据绑定"}>
            <Card bordered={false}>
                <Form name="basic" style={{marginTop: 8}}>
                    <Form.Item {...formItemLayout} name="Input" label={"单行输入"}>
                        <Input placeholder={"单行文本输入框组件"} />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="AutoComplete" label={"辅助输入"}>
                        <AutoComplete placeholder={"提供提示输入框组件"} />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="InputNumber" label={"数字输入"}>
                        <InputNumber placeholder={"单行数字输入框组件"} />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="Slider" label={"滑动输入"}>
                        <Slider min={1} max={100} />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="Rate" label={"评分输入"}>
                        <Rate />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="Password" label={"密码输入"}>
                        <Input.Password placeholder={"单行密码输入框组件"} />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="TextArea" label={"多行输入"}>
                        <Input.TextArea placeholder={"多行文本输入框组件"} />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="standard" label={"下拉选择"}>
                        <Select
                            placeholder={"下拉选择组件"}
                            options={[{label: "A", value: 0}, {label: "B", value: 1}, {label: "C", value: 2}]}
                        />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="Switch" label={"切换按钮"} valuePropName={"checked"}>
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="Radio" label={"单选组件"}>
                        <Radio.Group>
                            <Radio value="1">公开</Radio>
                            <Radio value="2">部分公开</Radio>
                            <Radio value="3">私有</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="Checkbox" label={"多选组件"}>
                        <Checkbox.Group
                            options={[{label: "A", value: 0}, {label: "B", value: 1}, {label: "C", value: 2}]}
                        />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="DatePicker" label={"日期选择"}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="RangePicker" label={"日期范围"}>
                        <DatePicker.RangePicker />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="TimePicker" label={"时间选择"}>
                        <TimePicker />
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="Upload" label={"上传组件"} valuePropName={"fileList"}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>点击上传</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item {...formItemLayout} name="dragger" label={"拖拽上传"} valuePropName={"fileList"}>
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </Card>
            <FooterToolbar style={{padding: 8}}>
                <Button type="primary">提交</Button>
                <Button style={{marginLeft: 8}}>重置</Button>
            </FooterToolbar>
        </PageContainer>
    );
}

export default BasicForm;
