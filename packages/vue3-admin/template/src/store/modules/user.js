import {Module} from "vuex";
import {getToken, setToken, removeToken} from "@/utils/auth";
import {login, getUserInfo, logout} from "@/api/user";
import {resetRouter} from "@/router";

/**
 * 用户全局状态模块
 * @type {Module}
 */
const module = {
    namespaced: true,
    state: {
        userInfo: {},
        token: getToken()
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        }
    },
    actions: {
        async login({commit}, payload) {
            const {username, password} = payload;
            const {data} = await login({username: username, password: password});
            commit("setToken", data.token);
            setToken(data.token);
        },
        async getUserInfo({commit}) {
            const {data} = getUserInfo();
            if (!data) {
                throw new Error("获取用户信息失败，请重新登录");
            }
            commit("setUserInfo", data);
        },
        async logout({commit}) {
            await logout();
            commit("setToken", null);
            commit("setUserInfo", {});
            removeToken();
            resetRouter();
        },
        async resetToken({commit}) {
            commit("setToken", null);
            removeToken();
        }
    }
};

export default module;
