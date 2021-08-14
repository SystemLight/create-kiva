import {createRouter, createWebHistory} from "vue-router";

import store from "@/store";

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: "index",
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/404",
            name: "404",
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
