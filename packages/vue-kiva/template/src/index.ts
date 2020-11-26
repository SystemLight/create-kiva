import "./global.less";

import Vue from "vue";

import RootPage from "@@/index.vue";

const vm = new Vue({
    render: (createElement) => createElement(RootPage)
});

vm.$mount("#root");
