import {asyncRoutes, constantRoutes} from "@/router";
import defaultSettings from "@/settings";

/**
 * 使用 meta.roles 判断当前用户是否有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => {
            const roles = route.meta.roles;
            return roles.includes(role);
        });
    } else {
        return true;
    }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
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

const permissionState = {
    routes: [],
    addRoutes: [],
    menu: []
};

const permissionMutations = {
    setRoutes(state, routes) {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
    },
    setMenu(state, menu) {
        state.menu = menu;
    }
};

const permissionActions = {
    // 根据角色生成不同路由
    async generateRoutes({commit}, roles) {
        let accessedRoutes;
        if (roles.includes("admin")) {
            accessedRoutes = asyncRoutes || [];

            // 根据不同角色生成不同导航栏
            commit("setMenu", defaultSettings.initAdminMenu);
        } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        commit("setRoutes", accessedRoutes);

        return accessedRoutes;
    }
};

const permissionModule = {
    namespaced: true,
    state: permissionState,
    mutations: permissionMutations,
    actions: permissionActions
};

export default permissionModule;
