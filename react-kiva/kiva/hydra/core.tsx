import React, {useEffect} from "react";
import {Select} from "antd";

import {IHydraProps} from "./interface";

export function Hydra({value, onChange, options, ...restProps}: IHydraProps) {
    useEffect(() => {
        if ((value === null) && options && options.length > 0) {
            onChange && onChange(options[0].value, options[0]);
        }
    }, [onChange, options, value]);

    return (
        <Select style={{width: "100%"}} value={value} onChange={onChange} options={options} {...restProps} />
    );
}
