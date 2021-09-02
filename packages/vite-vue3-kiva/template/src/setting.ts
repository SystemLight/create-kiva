import {MenuType} from "@/store/interface";

export const MENU_INDEX_DEF = {
    DEMO: "demo",
    DASHBOARD: "dashboard",
    TRIAL1: "trial1",
    TRIAL2: "trial2"
};

const initAdminMenu: MenuType[] = [
    {
        index: MENU_INDEX_DEF.DASHBOARD,
        title: "主页",
        link: "/dashboard"
    },
    {
        index: MENU_INDEX_DEF.DEMO,
        title: "演示",
        children: [
            {
                index: MENU_INDEX_DEF.TRIAL1,
                title: "尝试1",
                link: "/demo/trial1"
            },
            {
                index: MENU_INDEX_DEF.TRIAL2,
                title: "尝试2",
                link: "/demo/trial2"
            }
        ]
    }
];

const defaultSettings = {
    title: "后台管理",

    initAdminMenu: initAdminMenu
};

export default defaultSettings;
