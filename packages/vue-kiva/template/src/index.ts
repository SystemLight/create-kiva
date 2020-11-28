import "config/global.less";

import Vue from "vue";
import {Button} from "element-ui";

import RootPage from "@@/index.vue";

// 按需引入UI组件
Vue.use(Button);

new Vue({
    render: (createElement) => createElement(RootPage)
}).$mount("#root");
