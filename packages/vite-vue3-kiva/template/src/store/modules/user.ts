import {Module, ActionTree, MutationTree} from "vuex";
import {RootStateType, UserStateType} from "../interface";
import {getToken, setToken, removeToken} from "@/utils/auth";
import {login, getInfo, logout} from "@/api/user";
import router, {replaceRoutes, resetRouter} from "@/router";
import {RouteRecordRaw} from "vue-router";

const userState: UserStateType = {
    token: getToken() || "",
    name: "",
    avatar: "",
    introduction: "",
    roles: []
};

const userMutations: MutationTree<UserStateType> = {
    setToken(state, token) {
        state.token = token;
    },

    setIntroduction(state, introduction) {
        state.introduction = introduction;
    },

    setName(state, name) {
        state.name = name;
    },

    setAvatar(state, avatar) {
        state.avatar = avatar;
    },

    setRoles(state, roles) {
        state.roles = roles;
    }
};

const userActions: ActionTree<UserStateType, RootStateType> = {
    // user login
    async login({commit}, userInfo) {
        const {username, password} = userInfo;

        // TODO: 更改真实请求
        // const {data} = await login({username: username.trim(), password: password});
        const data = {token: "123"}

        commit("setToken", data.token);
        setToken(data.token);
        return data;
    },

    // get user info
    async getInfo({commit, state}) {
        // TODO: 更改真实请求
        // const {data} = await getInfo();
        const data = {
            roles: ["admin"],
            name: "abc",
            avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
            introduction: "abc"
        }

        if (!data) {
            throw new Error("Verification failed, please Login again.");
        }
        const {roles, name, avatar, introduction} = data;

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
            throw new Error("getInfo: roles must be a non-null array!");
        }

        commit("setRoles", roles);
        commit("setName", name);
        commit("setAvatar", avatar);
        commit("setIntroduction", introduction);

        return data;
    },

    // user logout
    async logout({commit}) {
        // TODO: 更改真实请求
        // await logout();

        commit("setToken", "");
        commit("setRoles", []);
        removeToken();
        resetRouter();
    },

    // remove token
    async resetToken({commit}) {
        commit("setToken", "");
        commit("setRoles", []);
        removeToken();
    },

    // dynamically modify permissions
    async changeRoles({commit, dispatch}, role) {
        const {roles} = await dispatch("getInfo");

        resetRouter();

        // 根据角色生成可访问的路由
        const accessRoutes: RouteRecordRaw[] = await dispatch("permission/generateRoutes", roles, {root: true});

        // 动态添加可访问的路由
        replaceRoutes(accessRoutes);

        // 重置访问视图和缓存视图
        // dispatch("tagsView/delAllViews", null, {root: true});
    }
};

const userModule: Module<UserStateType, RootStateType> = {
    namespaced: true,
    state: userState,
    mutations: userMutations,
    actions: userActions
};

export default userModule;
