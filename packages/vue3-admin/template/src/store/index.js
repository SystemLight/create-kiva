import {createStore} from "vuex";
import user from "./modules/user";
import permission from "./modules/permission";

const store = createStore({
    getters: {
        token: state => state.user.token
    },
    modules: {
        user,
        permission
    }
});

export default store;
