import {createStore} from "vuex";
import user from "./modules/user";
import permission from "./modules/permission";
import menu from "./modules/menu";
import breadcrumb from "./modules/breadcrumb";

const store = createStore({
    getters: {
        token: state => state.user.token
    },
    modules: {
        user,
        permission,
        menu,
        breadcrumb
    }
});

export default store;
