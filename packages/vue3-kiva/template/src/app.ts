import "./global.less";

import {createApp} from "vue";

import {store} from "@/models";
import {router} from "config";
import Root from "./root.vue";

createApp(Root).use(store).use(router).mount("#root");
