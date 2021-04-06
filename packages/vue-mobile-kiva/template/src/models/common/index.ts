import {Module} from "vuex";

const commonModel: Module<ICommonState, any> = {
    namespaced: true,
    state: () => ({
        count: 0
    }),
    mutations: {
        increment(state) {
            state.count++;
        }
    }
};

export interface ICommonState {
    count: number
}

export default commonModel;
