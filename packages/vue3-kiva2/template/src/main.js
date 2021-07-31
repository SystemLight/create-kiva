import "element-plus/lib/theme-chalk/index.css";
import "./styles/global.less";

import {createApp} from "vue";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";
import ElementPlus from "element-plus";

import App from "./app.vue";
import router from "./router";
import store from "./store";

const app = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus, {locale});

app.mount("#app");
