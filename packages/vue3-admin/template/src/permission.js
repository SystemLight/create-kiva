import router, {replaceRoutes} from "./router";
import store from "./store";
import {getToken} from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import {ElMessage} from "element-plus";

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
    // set page title
    document.title = getPageTitle(to.meta.title);

    // determine whether the user has logged in
    const hasToken = getToken();

    if (hasToken) {
        if (to.path === "/login") {
            // if is logged in, redirect to the home page
            next({path: "/"});
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;

            if (hasRoles) {
                next();
            } else {
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    const {roles} = await store.dispatch("user/getInfo");

                    // generate accessible routes map based on roles
                    const accessRoutes = await store.dispatch("permission/generateRoutes", roles);

                    // dynamically add accessible routes
                    replaceRoutes(accessRoutes);

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({...to, replace: true});
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch("user/resetToken");
                    ElMessage.error(error || "Has Error");
                    next(`/login?redirect=${to.path}`);
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`);

        }
    }
});

router.afterEach(() => {
});
