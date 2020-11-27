import React from "react";
import Button from "antd-mobile/lib/button";
import NavBar from "antd-mobile/lib/nav-bar";
import Icon from "antd-mobile/lib/icon";

import {VERSION} from "kiva";

export default function() {
    return (
        <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                rightContent={[
                    <Icon key="0" type="search" style={{marginRight: "16px"}} />,
                    <Icon key="1" type="ellipsis" />
                ]}
            >Kiva</NavBar>
            <div style={{padding: 25}}>
                <Button type="primary">kiva--{VERSION}</Button>
            </div>
        </div>
    );
}
