import router, {replaceRoutes} from "./router";
import store from "./store";
import getPageTitle from "./utils/get-page-title";
import {getToken} from "@/utils/auth";
import {RouteRecordRaw} from "vue-router";

const whiteList = ["/login", "/auth-redirect"];

router.beforeEach(async (to, from, next) => {
    // 设置路由页面标题
    // @ts-ignore
    document.title = getPageTitle(to.meta.title);

    // 判断用户是否已登录
    const hasToken = getToken();

    if (hasToken) {
        if (to.path === "/login") {
            // 如果已登录，则重定向到主页
            next({path: "/"});
        } else {
            // 通过getInfo判断用户是否获得了他的权限角色
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;

            if (hasRoles) {
                next();
            } else {
                try {
                    // 获取用户信息
                    // note: 角色必须是对象数组! such as: ['admin'] or ,['developer','editor']
                    const {roles} = await store.dispatch("user/getInfo");

                    // 根据角色生成可访问的路线图
                    const accessRoutes: RouteRecordRaw[] = await store.dispatch("permission/generateRoutes", roles);

                    // 动态添加可访问的路由
                    replaceRoutes(accessRoutes);

                    // hack 方法来确保 addRoutes 是完整的
                    // 设置replace:true，这样导航就不会留下历史记录
                    next({...to, replace: true});
                } catch (error) {
                    // 删除令牌并转到登录页面重新登录
                    await store.dispatch("user/resetToken");
                    next(`/login?redirect=${to.path}`);
                }
            }
        }
    } else {
        // 没有令牌
        if (whiteList.indexOf(to.path) !== -1) {
            // 在登录白名单中，直接进入
            next();
        } else {
            // 其他无权访问的页面被重定向到登录页面。
            next(`/login?redirect=${to.path}`);
        }
    }
});
