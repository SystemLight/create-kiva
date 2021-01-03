import React from "react";
import {Form, Input, Select} from "antd";

import {IMapSelectFormItemProps, IMapSelectProps} from "./interface";

/**
 * 提供简单字段映射机制，将对象中两个字段绑定到下拉框，一个用于显示一个用于返回值
 * @param {string} mapLabel
 * @param {string} mapValue
 * @param {string} value
 * @param {string} formIns
 * @param {string} restProps
 * @return {ReactNode} vDom
 */
export function MapSelect({mapLabel, mapValue, value, formIns, ...restProps}: IMapSelectProps) {
    const values = formIns.getFieldsValue();
    const selectValue = {label: values[mapLabel], value: values[value]};

    const handleChange = ({label, value}: {value: any, label: any}) => {
        formIns.setFieldsValue({[mapLabel]: label, [mapValue]: value});
    };

    return (<Select {...restProps} labelInValue={true} value={selectValue} onChange={handleChange} />);
}

/**
 * 在Form.Item中使用MapSelect的快捷方式
 * @param {any} formIns
 * @param {string} mapLabel
 * @param {string} mapValue
 * @param {string} restProps
 * @return {ReactNode} vDom
 */
export function ChoFormMapSelect({formIns, mapLabel, mapValue, ...restProps}: IMapSelectFormItemProps) {
    return (
        <>
            <Form.Item {...restProps} name={mapValue}>
                <MapSelect formIns={formIns} mapLabel={mapLabel} mapValue={mapValue} />
            </Form.Item>
            <Form.Item name={mapLabel} hidden={true}><Input /></Form.Item>
        </>
    );
}
