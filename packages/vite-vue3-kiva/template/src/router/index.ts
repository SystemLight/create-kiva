import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue";
import {MENU_INDEX_DEF} from "@/setting";

export const constantRoutes: RouteRecordRaw[] = [
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
                    activeMenu: MENU_INDEX_DEF.DASHBOARD
                }
            }
        ]
    }
];

export const asyncRoutes: RouteRecordRaw[] = [
    {
        name: "Demo",
        path: "/demo",
        component: Layout,
        children: [
            {
                name: "DemoTrial1",
                path: "trial1",
                component: () => import("@/views/demo/trial1.vue"),
                meta: {
                    title: "演示1",
                    activeMenu: MENU_INDEX_DEF.TRIAL1
                }
            },
            {
                name: "DemoTrial2",
                path: "trial2",
                component: () => import("@/views/demo/trial2.vue"),
                meta: {
                    title: "演示2",
                    activeMenu: MENU_INDEX_DEF.TRIAL2
                }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory("/"),
    routes: constantRoutes
});

/**
 * 为了可以正常清除路由，路由必须包含name属性
 */
export function resetRouter() {
    router.getRoutes().forEach((v) => {
        router.removeRoute(v.name as string);
    });
}

/**
 * 批量添加并替换掉原来的路由
 */
export function replaceRoutes(routes: RouteRecordRaw[]) {
    routes.forEach((v) => {
        router.addRoute(v);
    });
}

export default router;
