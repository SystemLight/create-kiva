import {MenuType} from "@/store/interface";

const initAdminMenu: MenuType[] = [
    {
        index: "dashboard",
        title: "主页",
        isSub: false,
        link: "/dashboard"
    },
    {
        index: "demo",
        title: "演示",
        isSub: true,
        children: [
            {
                index: "trial1",
                title: "尝试1",
                isSub: false,
                link: "/demo/trial1"
            },
            {
                index: "trial2",
                title: "尝试2",
                isSub: false,
                link: "/demo/trial2"
            }
        ]
    }
];

const defaultSettings = {
    title: "清源后台管理",

    initAdminMenu: initAdminMenu
};

export default defaultSettings;
