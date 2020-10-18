import React from "react";
import {Select, Spin} from "antd";
import debounce from "lodash/debounce";

import {IAsyncHydraProps, IAsyncHydraState} from "@core/hydra/interface";

export class AsyncHydra extends React.PureComponent<IAsyncHydraProps, IAsyncHydraState> {
    public lastFetchId: number = 0;
    public state = {
        options: [],
        fetching: false
    };

    constructor(props: IAsyncHydraProps) {
        super(props);
        this.fetchUser = debounce(this.fetchUser, 800);
    }

    getSnapshotBeforeUpdate(prevProps: Readonly<IAsyncHydraProps>, prevState: Readonly<IAsyncHydraState>) {
        return prevProps.defaultOptions !== this.props.defaultOptions;
    }

    componentDidUpdate(prevProps: Readonly<IAsyncHydraProps>, prevState: Readonly<IAsyncHydraState>, snapshot: boolean) {
        if (snapshot) {
            const {defaultOptions, onChange} = this.props;
            this.setState({options: defaultOptions || []});
            if (defaultOptions) {
                onChange && onChange(defaultOptions[0].value, defaultOptions[0]);
            }
        }
    }

    fetchUser = (searchValue: string) => {
        const {fetchOptions} = this.props;
        if (fetchOptions) {
            this.lastFetchId += 1;
            const fetchId = this.lastFetchId;
            this.setState({options: [], fetching: true});

            fetchOptions(searchValue).then((options) => {
                if (fetchId !== this.lastFetchId) {
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
        this.setState({options: [], fetching: false});
    };

    render() {
        const {value} = this.props;
        const {fetching, options} = this.state;
        return (
            <Select
                style={{width: "100%"}} value={value} options={options}
                filterOption={false} showSearch={true}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                onSearch={this.fetchUser} onChange={this.handleChange}
            />
        );
    }
}
