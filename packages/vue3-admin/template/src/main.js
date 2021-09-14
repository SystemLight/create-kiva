import "element-plus/dist/index.css";
import {createApp} from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/**
 * 参考文档：
 *      https://element-plus.gitee.io/#/zh-CN/component/installation
 *      https://vue3js.cn/docs/zh/api/application-config.html
 *      https://next.vuex.vuejs.org/zh/api/
 *      https://next.router.vuejs.org/zh/api/
 *      https://yuri4ever.github.io/jsdoc/
 */

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus, {size: "middle", zIndex: 3000, locale: zhCn});
app.mount("#app");
