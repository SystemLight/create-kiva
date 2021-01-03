import React, {TransitionEventHandler, useRef} from "react";
import {AutoComplete, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import useMergeValue from "use-merge-value";
import classNames from "classnames";

import styles from "./style.less";
import {HeaderSearchProps} from "./interface";

/*
    头部搜索框组件
 */
function HeaderSearch(props: HeaderSearchProps) {
    const {
        className, defaultValue, onVisibleChange, placeholder,
        open, defaultOpen, ...restProps
    } = props;

    const inputRef = useRef<Input | null>(null);

    const [value, setValue] = useMergeValue<string | undefined>(defaultValue, {
        value: props.value,
        onChange: props.onChange
    });
    const [searchMode, setSearchMode] = useMergeValue(defaultOpen || false, {
        value: props.open,
        onChange: onVisibleChange
    });

    const inputClass = classNames(styles.input, {[styles.show]: searchMode});

    /**
     * 搜索按钮点击时触发动画函数
     */
    const handleSearchClick = () => {
        setSearchMode(true);
        if (searchMode && inputRef.current) {
            inputRef.current.focus();
        }
    };

    /**
     * 动画结束后触发事件
     * @param {any} propertyName
     */
    const handleTransitionEnd: TransitionEventHandler = ({propertyName}) => {
        if (propertyName === "width" && !searchMode) {
            if (onVisibleChange) {
                onVisibleChange(searchMode);
            }
        }
    };

    return (
        <div
            className={classNames(className, styles.headerSearch)}
            onClick={handleSearchClick} onTransitionEnd={handleTransitionEnd}
        >
            <SearchOutlined key="Icon" style={{cursor: "pointer"}} />
            <AutoComplete
                key="AutoComplete" className={inputClass}
                value={value} onChange={setValue} style={{height: 28, marginTop: -6}}
                options={restProps.options}
            >
                <Input
                    ref={inputRef} defaultValue={defaultValue} placeholder={placeholder}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            restProps.onSearch && restProps.onSearch(value);
                        }
                    }}
                    onBlur={() => setSearchMode(false)}
                />
            </AutoComplete>
        </div>
    );
}

export default HeaderSearch;
