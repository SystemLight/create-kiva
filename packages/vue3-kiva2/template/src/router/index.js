import {createRouter, createWebHistory} from "vue-router";

import Home from "@/views/admin/home/index.vue";
import Admin from "@/views/admin/index.vue";
import Login from "@/views/login/index.vue";
import NotFound from "@/views/not-found/index.vue";
import store from "@/store";

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: "index",
            redirect: "/admin/home",
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/admin",
            component: Admin,
            children: [
                {
                    path: "home",
                    name: "admin-home",
                    component: Home,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                title: "登录",
                isWhiteLogin: true
            }
        },
        {
            path: "/404",
            name: "404",
            component: NotFound,
            meta: {
                title: "not found"
            }
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/404"
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : "默认标题";

    if (to.matched.some(record => record.meta.isWhiteLogin) && store.state.auth.isLogin) {
        return next("/");
    }

    if (to.matched.some(record => record.meta.requiresAuth) && !store.state.auth.isLogin) {
        return next({
            path: "/login",
            query: {next: to.fullPath}
        });
    }

    next();
});

export default router;
