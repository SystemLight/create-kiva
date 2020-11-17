import React from "react";
import {Select, Spin} from "antd";
import debounce from "lodash/debounce";

import {IAsyncHydraProps, IAsyncHydraState} from "./interface";
import {isNullValue} from "../utils";

export class AsyncHydra extends React.PureComponent<IAsyncHydraProps, IAsyncHydraState> {
    public lastFetchId: number = 0;
    public state = {
        options: [],
        fetching: false
    };
    public isDidMount = false;
    public nativeRef = React.createRef<any>();

    constructor(props: IAsyncHydraProps) {
        super(props);
        this.fetchUser = debounce(this.fetchUser, 800);
    }

    componentWillUnmount() {
        this.isDidMount = true;
    }

    native = () => {
        return this.nativeRef;
    };

    fetchUser = (searchValue: string) => {
        if (isNullValue(searchValue)) {
            return;
        }

        const {fetchOptions} = this.props;
        if (fetchOptions) {
            const fetchId = ++this.lastFetchId;
            this.setState({options: [], fetching: true});
            fetchOptions(searchValue).then((options) => {
                if (fetchId !== this.lastFetchId || this.isDidMount) {
                    // for fetch callback order
                    return;
                }
                this.setState({options, fetching: false});
            });
        }
    };

    handleChange = (value: any, option: any) => {
        const {onChange} = this.props;
        onChange && onChange(value, option);
    };

    render() {
        const {value, labelInValue, allowClear, onBlur} = this.props;
        const {fetching, options} = this.state;

        return (
            <Select
                style={{width: "100%"}} value={value} options={options}
                filterOption={false} showSearch={true} labelInValue={labelInValue}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                allowClear={allowClear} onSearch={this.fetchUser} onChange={this.handleChange}
                ref={this.nativeRef} onBlur={onBlur}
            />
        );
    }
}
