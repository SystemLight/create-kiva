import {InjectionKey} from "vue";
import {createStore, GetterTree, MutationTree, ActionTree, useStore as basicUseStore} from "vuex";
import {AllStateType, RootStateType} from "./interface";
import userModule from "./modules/user";
import permissionModule from "./modules/permission";
import appModule from "./modules/app";

export const KEY: InjectionKey<AllStateType> = Symbol("vuex-store");

export function useStore() {
    return basicUseStore<AllStateType>(KEY);
}

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
        permission: permissionModule,
        app: appModule
    },
    state: state as AllStateType,
    getters: getters,
    mutations: mutations,
    actions: actions
});

export default store;
