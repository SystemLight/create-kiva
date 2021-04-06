import "element-ui/lib/theme-chalk/index.css";
import "./global.less";

import axios from "axios";
import ElementUI from "element-ui";
import Vue from "vue";

import Index from "@@/index.vue";

Vue.prototype.$http = axios;
Vue.prototype.$ELEMENT = {size: "small"};
Vue.use(ElementUI);

new Vue({
    render: (h) => h(Index)
}).$mount("#root");
