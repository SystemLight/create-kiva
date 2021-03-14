import React, {useEffect, useReducer, useState, useCallback, ChangeEvent} from "react";

/*
    观察组件的渲染和卸载时机，并输出打印LOG
 */
export function useObserved(componentName: string) {
    console.log(`${componentName}被渲染`);
    const __componentName = componentName;
    useEffect(() => () => console.log(`${__componentName}被卸载`), []);
}

/*
    页面退出提示控制
 */
export function useLeavePrompt() {
    useEffect(() => {
        window.onbeforeunload = function(e: BeforeUnloadEvent) {
            if (process.env.NODE_ENV !== "development") {
                e.returnValue = "prompt";
            }
        };
        return () => {
            window.onbeforeunload = null;
        };
    }, []);
    return {
        set() {
            window.onbeforeunload = function(e: BeforeUnloadEvent) {
                e.returnValue = "prompt";
            };
        },
        cancel() {
            window.onbeforeunload = null;
        },
        close() {
            window.onbeforeunload = null;
            window.close();
        }
    };
}

/**
 * 用于合并 props 的 value 和自己的 value 的 hooks。
 * 来源：https://github.com/chenshuai2144/merge-value-hooks
 * @template T
 * @template R
 * @param {R | function():T} defaultStateValue - 默认状态值
 * @param {Object} option - 状态控制参数
 * @param {T | function():T} option.defaultValue - 默认状态值
 * @param {T} option.value - 状态值
 * @param {function(value: T, prevValue: T):void} option.onChange - 数据改变触发函数
 * @param {function(value:T):T} option.postState - 数据处理过滤函数
 * @return {[R,function(value:T):void]}
 */
export function useMergeState<T, R = T>(
    defaultStateValue: T | (() => T),
    option?: {
        defaultValue?: T | (() => T);
        value?: T;
        onChange?: (value: T, prevValue: T) => void;
        postState?: (value: T) => T;
    }
): [R, (value: T) => void] {
    const {defaultValue, value, onChange, postState} = option || {};
    const [innerValue, setInnerValue] = React.useState<T>(() => {
        if (value !== undefined) {
            return value;
        }
        if (defaultValue !== undefined) {
            return typeof defaultValue === "function" ? (defaultValue as any)() : defaultValue;
        }
        return typeof defaultStateValue === "function" ? (defaultStateValue as any)() : defaultStateValue;
    });

    let mergedValue = value !== undefined ? value : innerValue;
    if (postState) {
        mergedValue = postState(mergedValue);
    }

    function triggerChange(newValue: T) {
        setInnerValue(newValue);
        if (mergedValue !== newValue && onChange) {
            onChange(newValue, mergedValue);
        }
    }

    return [(mergedValue as unknown) as R, triggerChange];
}

/*
    useImmerState提供一种定义对象型状态的方法，设置值内容时可以直接设置改变部分
 */
function reducer(prevState: any, action: any) {
    return {...prevState, ...action};
}

export function useImmerState<S extends {}>(initState: S): [S, (changeState: Partial<S>) => void] {
    return useReducer(reducer, initState);
}

/**
 * 快捷双向绑定表单状态
 * @param {any} initValue
 * @param {any} beforeChange
 * @return {any} any
 */
export function useTwoWay<S>(initValue: S | (() => S), beforeChange: (e: ChangeEvent<any>) => boolean) {
    const [value, setValue] = useState(initValue);
    const onChange = useCallback(function(e: ChangeEvent<any>) {
        if (!beforeChange || beforeChange(e)) {
            setValue(e.target.value);
        }
    }, [beforeChange]);
    return [{value, onChange}, setValue];
}
