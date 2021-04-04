import "element-ui/lib/theme-chalk/index.css";
import "./global.less";

import Vue from "vue";
import ElementUI from "element-ui";

import Index from "@@/index.vue";

Vue.prototype.$ELEMENT = {size: "small"};
Vue.use(ElementUI);

new Vue({
    render: (h) => h(Index)
}).$mount("#root");
