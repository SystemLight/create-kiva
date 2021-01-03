import {AutoCompleteProps} from "antd/es/auto-complete";

export interface HeaderSearchProps {
    onSearch?: (value?: string) => void;
    onChange?: (value?: string) => void;
    onVisibleChange?: (b: boolean) => void;
    className?: string;
    placeholder?: string;
    options: AutoCompleteProps["options"];
    defaultOpen?: boolean;
    open?: boolean;
    defaultValue?: string;
    value?: string;
}
