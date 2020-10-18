import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {PageHeader, Button, Descriptions} from "antd";
import {Link, useLocation} from "react-router-dom";

import {RouteView} from "@c/routeView";
import {useObserved} from "@c/useHooks";
import {asyncSetDate, exampleSelector} from "@/models";
import {qr} from "@/config";

export default function ExamplePage() {
    useObserved("ExamplePage");

    const {pathname} = useLocation();
    const date = useSelector(exampleSelector);
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(asyncSetDate);
    };

    const isMyLink = pathname.includes("/example/my");
    const targetLink = isMyLink ? "/example" : "/example/my";

    const isTableLink = pathname.includes("/example/edittable");
    const targetTableLink = isTableLink ? "/example" : "/example/edittable";

    return (
        <div>
            <PageHeader
                style={{border: "1px solid rgb(235, 237, 240)"}}
                title={"示例页面"}
                onBack={() => location.href = "/"}
                extra={[
                    <Button key="btn" onClick={onClick}>改时</Button>
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="时间"> {date}</Descriptions.Item>
                    <Descriptions.Item label="内容">演示界面</Descriptions.Item>
                    <Descriptions.Item label="作者">{"SystemLight"}</Descriptions.Item>
                    <Descriptions.Item label="项目">react-webpack-ts</Descriptions.Item>
                    <Descriptions.Item label="我的">
                        <Link to={targetLink}>
                            <Button type={"link"} style={{padding: 0, margin: 0, height: "auto"}}>
                                {isMyLink ? "隐藏" : "显示"}我的
                            </Button>
                        </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="表格">
                        <Link to={targetTableLink}>
                            <Button type={"link"} style={{padding: 0, margin: 0, height: "auto"}}>
                                {isTableLink ? "隐藏" : "显示"}表格
                            </Button>
                        </Link>
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <div style={{marginTop: 15, display: "flex", justifyContent: "center"}}>
                <RouteView routes={qr.getRoute("$.example")} />
            </div>
        </div>
    );
}
