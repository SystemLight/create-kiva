import {createRouter, createWebHistory} from "vue-router";

import store from "@/store";
import NotFound from "@/views/not-found/index.vue";
import Home from "@/views/home/index.vue";
import MusicPlayDemo from "@/views/music-play-demo/index.vue";

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: "index",
            component: Home
        },
        {
            path: "/music-play-demo",
            name: "music-play-demo",
            component: MusicPlayDemo
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
