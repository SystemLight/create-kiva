import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue";

export const constantRoutes: RouteRecordRaw[] = [
    {
        path: "/redirect",
        component: Layout,
        children: [
            {
                path: "/redirect/:path(.*)",
                component: () => import("@/views/redirect/index.vue")
            }
        ]
    },
    {
        path: "/login",
        component: () => import("@/views/login/index.vue")
    },
    {
        path: "/auth-redirect",
        component: () => import("@/views/login/auth-redirect.vue")
    },
    {
        path: "/404",
        component: () => import("@/views/error-page/404.vue")
    },
    {
        path: "/401",
        component: () => import("@/views/error-page/401.vue")
    }
];

export const asyncRoutes: RouteRecordRaw[] = [];

const router = createRouter({
    history: createWebHistory("/"),
    routes: constantRoutes
});

export default router;
