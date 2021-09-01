import axios from "axios";
import {ElMessageBox, ElMessage} from "element-plus";
import store from "@/store";
import {getToken} from "@/utils/auth";

export const baseUrl = {
    // 测试接口域名
    development: {
        baseUrl: "/api"
    },
    // 测试接口域名
    beta: {
        baseUrl: "/api"
    },
    // 正式接口域名
    release: {
        baseUrl: "/api"
    }
};

export type baseUrlKey = keyof typeof baseUrl;

// create an axios instance
const service = axios.create({
    // url = base url + request url
    baseURL: baseUrl[import.meta.env.MODE as baseUrlKey]["baseUrl"],
    // send cookies when cross-domain requests
    withCredentials: true,
    // request timeout
    timeout: 6 * 60 * 1000
});

// request interceptor
service.interceptors.request.use(
    (config) => {
        // do something before request is sent

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers["X-Token"] = getToken();
        }
        return config;
    },
    (error) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        const res = response.data;

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
            ElMessage({
                type: "error",
                message: res.message || "Error",
                duration: 5 * 1000
            });

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                ElMessageBox.confirm("您已退出，您可以取消停留在此页面，或重新登录", "确认退出", {
                    type: "warning",
                    confirmButtonText: "重新登录",
                    cancelButtonText: "取消"
                }).then(() => {
                    store.dispatch("user/resetToken").then(() => {
                        location.reload();
                    });
                });
            }
            return Promise.reject(new Error(res.message || "Error"));
        } else {
            return res;
        }
    },
    (error) => {
        console.log("err" + error); // for debug
        ElMessage({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
