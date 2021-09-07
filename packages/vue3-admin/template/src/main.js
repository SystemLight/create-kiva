import "element-plus/dist/index.css";
import "@/styles/global.less";

import {createApp} from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import App from "@/App";
import router from "@/router";
import store from "@/store";
import "./permission";

// 参考文档：https://element-plus.gitee.io/#/zh-CN/component/installation
const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus, {size: "middle", zIndex: 3000, locale: zhCn});

app.mount("#app");
