import {createStore, GetterTree, MutationTree, ActionTree} from "vuex";
import {AllStateType, RootStateType} from "./interface";
import userModule from "./modules/user";
import permissionModule from "./modules/permission";

const state: RootStateType = {};

const getters: GetterTree<AllStateType, RootStateType> = {
    token(state) {
        return state.user.token;
    },
    roles(state) {
        return state.user.roles;
    }
};

const mutations: MutationTree<AllStateType> = {};

const actions: ActionTree<AllStateType, RootStateType> = {};

const store = createStore<AllStateType>({
    modules: {
        user: userModule,
        permission: permissionModule
    },
    state: state as AllStateType,
    getters: getters,
    mutations: mutations,
    actions: actions
});

export default store;
