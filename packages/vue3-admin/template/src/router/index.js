import {createWebHistory, createRouter, RouteRecordRaw} from "vue-router";
import {ElMessage} from "element-plus";
import {getToken} from "@/utils/auth";
import getPageTitle from "@/utils/get-page-title";
import Layout from "@/layout/index.vue";
import store from "@/store";

/**
 * 基础应用路由表
 * @type {RouteRecordRaw[]}
 */
export const constantRoutes = [
    {
        name: "Login",
        path: "/login",
        component: () => import("@/views/login/index")
    },
    {
        name: "404",
        path: "/404",
        component: () => import("@/views/error-page/404")
    },
    {
        name: "401",
        path: "/401",
        component: () => import("@/views/error-page/401")
    }
];

/**
 * 权限异步加载路由表，登录后根据权限进行访问
 * @type {RouteRecordRaw[]}
 */
export const asyncRoutes = [
    {
        name: "DashboardLayout",
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                name: "Dashboard",
                path: "dashboard",
                component: () => import("@/views/dashboard/index"),
                meta: {
                    title: "主页"
                }
            }
        ]
    },
    {
        name: "NotFound",
        path: "/:fullPath(.*)*",
        redirect: "/404"
    }
];

const router = createRouter({
    history: createWebHistory("/"),
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes.concat(asyncRoutes)
});

/**
 * 路由拦截白名单
 * @type {string[]}
 */
const whiteList = ["/login"];

// router.beforeEach(async (to, from, next) => {
//     document.title = getPageTitle(to.meta.title);
//
//     const hasToken = getToken();
//     if (hasToken) {
//         if (to.path === "/login") {
//             next({path: "/"});
//         } else {
//             try {
//                 await store.dispatch("user/getUserInfo");
//                 const accessRoutes = await store.dispatch("permission/generateRoutes");
//                 addRoutes(accessRoutes);
//                 next({...to, replace: true});
//             } catch (error) {
//                 await store.dispatch("user/resetToken");
//                 ElMessage.error(error || "#01 权限错误");
//                 next(`/login?redirect=${to.path}`);
//             }
//         }
//     } else {
//         if (whiteList.indexOf(to.path) !== -1) {
//             next();
//         } else {
//             next(`/login?redirect=${to.path}`);
//         }
//     }
// });

/**
 * 重置路由
 */
export function resetRouter() {
    router.getRoutes().forEach((v) => {
        router.removeRoute(v.name);
    });
}

/**
 * 添加动态路由
 * @param {RouteRecordRaw[]} accessRoutes
 */
export function addRoutes(accessRoutes) {
    accessRoutes.forEach((v) => {
        router.addRoute(v);
    });
}

export default router;
