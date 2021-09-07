export const MENU_INDEX_DEF = {
    DASHBOARD: "dashboard",
    BRAND: "brand",
    BRAND_LIST: "brand_list"
};

const initAdminMenu = [
    {
        index: MENU_INDEX_DEF.DASHBOARD,
        title: "主页",
        link: "/dashboard"
    },
    // {
    //     index: MENU_INDEX_DEF.BRAND,
    //     title: "品牌",
    //     // children: [
    //     //     {
    //     //         index: MENU_INDEX_DEF.BRAND_LIST,
    //     //         title: "品牌列表",
    //     //         link: "/brand/list"
    //     //     },
    //     //     {
    //     //         index: MENU_INDEX_DEF.BRAND_LIST,
    //     //         title: "编辑品牌",
    //     //         link: "/brand/list"
    //     //     }
    //     // ]
    // }
];

export default {
    title: "vue3-admin",

    publicPath: process.env.BASE_URL,

    initAdminMenu: initAdminMenu
};
