import React, {useEffect} from "react";

/*
    观察组件的渲染和卸载时机，并输出打印LOG
 */
export function useObserved(componentName: string) {
    console.log(`${componentName}被渲染`);
    const __componentName = componentName;
    useEffect(() => () => console.log(`${__componentName}被卸载`), []);
}

/*
    用于合并 props 的 value 和自己的 value 的 hooks。
    来源：https://github.com/chenshuai2144/merge-value-hooks
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
