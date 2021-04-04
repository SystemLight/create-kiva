import VueRouter from "vue-router";

import AdminRoot from "@@/admin/index.vue";
import Trial from "@@/admin/trial.vue";

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/admin"
        },
        {
            path: "/admin",
            component: AdminRoot,
            children: [
                {
                    path: "/admin/trial",
                    component: Trial
                }
            ]
        }
    ]
});
