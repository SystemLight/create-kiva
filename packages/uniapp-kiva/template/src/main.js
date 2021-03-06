import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;
App.mpType = "app";

new Vue({
    ...App
}).$mount();
