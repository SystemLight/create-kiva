export default {
    namespaced: true,
    state() {
        return {
            isLogin: !!localStorage.getItem("token"),
            token: localStorage.getItem("token"),
            userInfo: {
                id: -1,
                avatar: null,
                name: null
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
                name: null
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
            context.commit("login", {token: "token"});
            await context.dispatch("loadUser");
        },
        async logoutAsync(context) {
            context.commit("logout");
        },
        async loadUser(context) {
            if (context.state.isLogin) {
                context.commit("setUser", {
                    id: 1,
                    avatar: null,
                    name: "测试用户"
                });
            }
        }
    }
};
