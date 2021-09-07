import {createRouter, createWebHistory} from "vue-router";
import settings, {MENU_INDEX_DEF} from "@/settings";
import Layout from "@/layout/index.vue";

export const constantRoutes = [
    {
        name: "Login",
        path: "/login",
        component: () => import("@/views/login/index.vue")
    },
    {
        name: "404",
        path: "/404",
        component: () => import("@/views/error-page/404.vue")
    },
    {
        name: "401",
        path: "/401",
        component: () => import("@/views/error-page/401.vue")
    },
    {
        name: "DashboardLayout",
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                name: "Dashboard",
                path: "/dashboard",
                component: () => import("@/views/dashboard/index.vue"),
                meta: {
                    title: "主页",
                    activeMenu: MENU_INDEX_DEF.DASHBOARD,
                    breadcrumb: "主页"
                }
            }
        ]
    }
];

export const asyncRoutes = [
    // ---
    {
        name: "NotFound",
        path: "/:fullPath(.*)*",
        redirect: "/404"
    }
];

const router = createRouter({
    history: createWebHistory(settings.publicPath),
    routes: constantRoutes
});

/**
 * 为了可以正常清除路由，路由必须包含name属性
 */
export function resetRouter() {
    router.getRoutes().forEach((v) => {
        router.removeRoute(v.name);
    });
}

/**
 * @callback replaceRoutes
 * @desc 批量添加并替换掉原来的路由
 * @param {[]} routes - 路由表
 * @returns {void}
 */
export function replaceRoutes(routes) {
    routes.forEach((v) => {
        router.addRoute(v);
    });
}

export default router;
