import {Module} from "vuex";
import {RouteRecordRaw} from "vue-router";
import {constantRoutes, asyncRoutes} from "@/router";

/**
 * 通过路由的meta.roles判断当前用户是否拥有路由权限
 * @param {String[]} roles
 * @param {RouteRecordRaw} route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta["roles"]) {
        return roles.some((role) => route.meta["roles"].includes(role));
    } else {
        return true;
    }
}

/**
 * 可用于复杂的路由权限过滤
 * @param {RouteRecordRaw[]} routes - 路由表
 * @param {String[]} roles - 权限表
 */
export function filterAsyncRoutes(routes, roles) {
    const res = [];
    routes.forEach((route) => {
        const tmp = {...route};
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles);
            }
            res.push(tmp);
        }
    });
    return res;
}

/**
 * 权限全局状态模块，记录生成的内容
 * @type {Module}
 */
const module = {
    namespaced: true,
    state: {
        routes: [],
        addRoutes: []
    },
    mutations: {
        setRoutes(state, routes) {
            state.addRoutes = routes; // 增加的路由
            state.routes = constantRoutes.concat(routes); // 全部合成后路由表
        }
    },
    actions: {
        async generateRoutes({commit}) {
            commit("setRoutes", asyncRoutes);
            return asyncRoutes;
        }
    }
};

export default module;
