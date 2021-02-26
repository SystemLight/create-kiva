import "./global.less";

import Vue from "vue";

import {router} from "config/index";
import {install} from "config/plugins";
import {store} from "@/models";

install();
new Vue({
    store: store,
    router: router,
    render: (h) => h("router-view")
}).$mount("#root");
