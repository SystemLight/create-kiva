import "vant/lib/index.css";
import "./global.less";

import axios from "axios";
import Vue from "vue";
import Vant from "vant";

import Index from "@@/index.vue";

Vue.prototype.$http = axios;
Vue.use(Vant);

new Vue({
    render: (h) => h(Index)
}).$mount("#root");
