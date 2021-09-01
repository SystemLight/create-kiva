import {Module, ActionTree, MutationTree} from "vuex";
import {RootStateType, UserStateType} from "../interface";
import {getToken, setToken, removeToken} from "@/utils/auth";
import {login, getInfo, logout} from "@/api/user";

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
        const response = await login({username: username.trim(), password: password});
        const {data} = response;
        commit("setToken", data.token);
        setToken(data.token);
    },

    // get user info
    async getInfo({commit, state}) {
        const {data} = await getInfo();
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
        await logout();
        commit("setToken", "");
        commit("setRoles", []);
        removeToken();
        location.reload();
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

        // generate accessible routes map based on roles
        // const accessRoutes = await dispatch("permission/generateRoutes", roles, {root: true});

        // dynamically add accessible routes
        // router.addRoutes(accessRoutes);

        // reset visited views and cached views
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
