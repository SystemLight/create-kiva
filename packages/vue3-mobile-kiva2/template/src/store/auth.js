import {getUser, login, logout} from "@/api";

export default {
    namespaced: true,
    state() {
        return {
            isLogin: !!localStorage.getItem("token"),
            token: localStorage.getItem("token"),
            userInfo: {
                id: -1,
                avatar: null,
                create_at: null,
                name: null,
                phone: null,
                priority: 0
            }
        };
    },
    mutations: {
        login(state, payload) {
            state.token = payload.token;
            localStorage.setItem("token", payload.token);
            state.isLogin = true;
        },
        logout(state) {
            localStorage.removeItem("token");
            state.isLogin = false;
            state.token = null;
            state.userInfo = {
                id: -1,
                avatar: null,
                create_at: null,
                name: null,
                phone: null,
                priority: 0
            };
        },
        setUser(state, payload) {
            if (state.isLogin) {
                state.userInfo = payload;
            }
        }
    },
    actions: {
        async loginAsync(context, payload) {
            const response = await login(payload);

            if (response.data.data.token) {
                context.commit("login", {token: response.data.data.token});
            } else {
                throw new Error("token不存在");
            }

            await context.dispatch("loadUser");
        },
        async logoutAsync(context) {
            await logout();
            context.commit("logout");
        },
        async loadUser(context) {
            if (context.state.isLogin) {
                const {data} = await getUser(-1);
                context.commit("setUser", data.data);
            }
        }
    }
};
