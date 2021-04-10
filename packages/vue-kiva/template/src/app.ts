import "element-ui/lib/theme-chalk/index.css";
import "./global.less";

import ElementUI from "element-ui";
import Vue from "vue";

import request from "@/utils/request";
import Index from "@@/index.vue";

Vue.prototype.$request = request;
Vue.prototype.$ELEMENT = {size: "small"};
Vue.use(ElementUI);

new Vue({
    render: (h) => h(Index)
}).$mount("#root");
