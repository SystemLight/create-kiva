import Vuex from "vuex";

import commonModel from "./common";

export function createStore() {
    return new Vuex.Store({
        modules: {
            common: commonModel
        }
    });
}
