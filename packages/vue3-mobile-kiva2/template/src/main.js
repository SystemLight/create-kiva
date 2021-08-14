import "vant/lib/index.css";
import "./styles/global.less";
import "./styles/style.less";

import {createApp} from "vue";
import "dayjs/locale/zh-cn";
import Vant from "vant";

import App from "./app.vue";
import router from "./router";
import store from "./store";

const app = createApp(App)
    .use(router)
    .use(store)
    .use(Vant);

app.mount("#app");
