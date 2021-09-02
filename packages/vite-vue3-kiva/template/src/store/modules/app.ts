import {RootStateType, AppStateType} from "../interface";
import {ActionTree, Module, MutationTree} from "vuex";

const appState: AppStateType = {
    sidebar: {
        opened: true,
        withoutAnimation: true
    },
    device: "pc",
    size: "middle"
};

const appMutations: MutationTree<AppStateType> = {
};

const appActions: ActionTree<AppStateType, RootStateType> = {};

const appModule: Module<AppStateType, RootStateType> = {
    namespaced: true,
    state: appState,
    mutations: appMutations,
    actions: appActions
};

export default appModule;
