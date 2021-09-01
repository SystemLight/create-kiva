import {asyncRoutes, constantRoutes} from "@/router";
import {ActionTree, Module, MutationTree} from "vuex";
import {RouteRecordRaw} from "vue-router";
import {PermissionStateType, RootStateType} from "@/store/interface";

/**
 * 使用 meta.roles 判断当前用户是否有权限
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => {
            const roles: string[] = (route.meta as any).roles;
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
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
    const res: RouteRecordRaw[] = [];

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

const permissionState: PermissionStateType = {
    routes: [],
    addRoutes: []
};

const permissionMutations: MutationTree<PermissionStateType> = {
    setRoutes(state, routes) {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
    }
};

const permissionActions: ActionTree<PermissionStateType, RootStateType> = {
    // 根据角色生成不同路由
    async generateRoutes({commit}, roles) {
        let accessedRoutes;
        if (roles.includes("admin")) {
            accessedRoutes = asyncRoutes || [];
        } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        commit("setRoutes", accessedRoutes);

        return accessedRoutes;
    }
};

const permissionModule: Module<PermissionStateType, RootStateType> = {
    namespaced: true,
    state: permissionState,
    mutations: permissionMutations,
    actions: permissionActions
};

export default permissionModule;
