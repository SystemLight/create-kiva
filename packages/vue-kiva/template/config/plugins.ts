import Vue from "vue";
import {Button} from "element-ui";
import VueRouter from "vue-router";

export function install() {
    Vue.use(VueRouter);

    Vue.use(Button);
}
