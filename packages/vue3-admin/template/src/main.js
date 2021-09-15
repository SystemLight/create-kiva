import {createApp} from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "normalize.css";
import "@/styles/element-variables.scss";
import "@/styles/index.scss";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElDragDialog from "@/directive/el-drag-dialog";

/**
 * 参考文档：
 *      https://element-plus.gitee.io/#/zh-CN/component/installation
 *      https://vue3js.cn/docs/zh/api/application-config.html
 *      https://next.vuex.vuejs.org/zh/api/
 *      https://next.router.vuejs.org/zh/api/
 *      https://yuri4ever.github.io/jsdoc/
 *      https://github.com/PanJiaChen/vue-element-admin
 */

const app = createApp(App);

// 注册中间件
app.use(router);
app.use(store);
app.use(ElementPlus, {size: "small", zIndex: 3000, locale: zhCn});

// 注册指令 https://vue3js.cn/docs/zh/guide/custom-directive.html#%E7%AE%80%E4%BB%8B
app.directive("drag", ElDragDialog);

app.mount("#app");
