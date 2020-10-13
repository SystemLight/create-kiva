import React from "react";
import {TeamOutlined} from "@ant-design/icons";

import {IRootNav} from "@c/components/workbench/interface";

/*
    主页导航栏结构树，快速配置通用左侧导航栏，并生成对应面包屑，
    key值必须与约定式路由中目录名结构一致，嵌套结构亦如此
 */
export const navs: IRootNav[] = [
    {
        key: "example",
        title: "举例",
        icon: <TeamOutlined />,
        items: [
            {
                key: "my",
                title: "我的",
                icon: <TeamOutlined />
            },
            {
                key: "SystemLight",
                title: "作者",
                icon: <TeamOutlined />
            }
        ]
    },
    {
        key: "example2",
        title: "举例-2",
        icon: <TeamOutlined />
    },
    {
        key: "example3",
        title: "举例-3",
        icon: <TeamOutlined />
    }
];
