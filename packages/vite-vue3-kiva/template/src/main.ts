import "element-plus/dist/index.css";
import "@/styles/global.less";
import "@/styles/sidebar.less";
import "@/styles/style.less";
import {createApp} from "vue";
import ElementPlus from "element-plus";
import App from "@/App.vue";
import router from "@/router";
import store, {KEY} from "@/store";
import "./permission";

const app = createApp(App);
app.use(store, KEY);
app.use(router);
app.use(ElementPlus, {size: "middle", zIndex: 3000});
app.mount("#app");
