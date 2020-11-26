import React, {useEffect} from "react";
import {Select} from "antd";

import {IHydraProps} from "./interface";

/*
    与antd select唯一区别是当value为null时自动触发选择options第一个选项
 */
export function Hydra({value, onChange, options, ...restProps}: IHydraProps) {
    useEffect(() => {
        if (onChange && (value === null) && options && options.length > 0) {
            onChange(options[0].value, options[0]);
        }
    }, [onChange, options, value]);

    return (
        <Select style={{width: "100%"}} value={value} onChange={onChange} options={options} {...restProps} />
    );
}
