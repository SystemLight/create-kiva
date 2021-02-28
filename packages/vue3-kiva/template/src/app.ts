import "./global.less";

import {createApp} from "vue";

import {store} from "@/models";
import {router} from "config";
import App from "./app.vue";

createApp(App).use(store).use(router).mount("#root");
