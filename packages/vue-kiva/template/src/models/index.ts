import Vue from "vue";
import Vuex from "vuex";

import commonModel from "./common";

Vue.use(Vuex);
export const store = new Vuex.Store({
    modules: {
        common: commonModel
    }
});
