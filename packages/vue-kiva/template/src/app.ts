import "./global.less";

import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import {Button} from "element-ui";

import {router} from "config";
import {createStore} from "@/models";

Vue.prototype.$ELEMENT = {size: "small"};

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Button);

new Vue({
    store: createStore(),
    router: router,
    render: (h) => h("router-view")
}).$mount("#root");
