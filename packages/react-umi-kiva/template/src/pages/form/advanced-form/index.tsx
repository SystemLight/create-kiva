import React, {useState} from "react";
import {Card, Tabs} from "antd";
import {TabPaneProps} from "antd/lib/tabs";
import {PageContainer} from "@ant-design/pro-layout";

import MapForm from "./components/MapForm";

const tabList: (TabPaneProps & {key?: React.ReactText;})[] = [
    {
        key: "map-form",
        tab: "映射表单"
    }
];

function AdvanceForm() {
    const [activeKey, setActiveKey] = useState("map-form");

    return (
        <PageContainer content={"高级表单用于展示根据业务逻辑自定义封装绑定数据的组件实现"} tabList={tabList} onTabChange={setActiveKey}>
            <Card bordered={false}>
                <Tabs defaultActiveKey={"login"} activeKey={activeKey} renderTabBar={() => (<></>)}>
                    <Tabs.TabPane key={"map-form"}>
                        <MapForm />
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        </PageContainer>
    );
}

export default AdvanceForm;
