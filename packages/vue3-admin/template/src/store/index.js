import {createStore} from "vuex";

import userModule from "./modules/user";
import permissionModule from "./modules/permission";

const getters = {
    token(state) {
        return state.user.token;
    },
    roles(state) {
        return state.user.roles;
    }
};

const store = createStore({
    modules: {
        user: userModule,
        permission: permissionModule
    },
    getters: getters
});

export default store;
