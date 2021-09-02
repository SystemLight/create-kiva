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

// 创建 axios 实例
const service = axios.create({
    // url = base url + request url
    baseURL: baseUrl[import.meta.env.MODE as baseUrlKey]["baseUrl"],
    // 跨域请求时发送cookies
    withCredentials: true,
    // 请求超时
    timeout: 6 * 60 * 1000
});

// request interceptor
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做一些事情

        if (store.getters.token) {
            // 让每个请求都携带令牌
            // ['X-Token'] 是自定义头key
            // 请根据实际情况修改
            config.headers["X-Token"] = getToken();
        }
        return config;
    },
    (error) => {
        // 做一些请求错误的事情
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    (response) => {
        const data = response.data;

        // if the custom code is not 20000, it is judged as an error.
        if (data.code !== 20000) {
            ElMessage({
                type: "error",
                message: data.message || "Response Code Error",
                duration: 5 * 1000
            });

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (data.code === 50008 || data.code === 50012 || data.code === 50014) {
                // to re-login
                ElMessageBox.confirm("您已退出，您可以取消停留在此页面，或重新登录", "确认退出", {
                    type: "warning",
                    confirmButtonText: "重新登录",
                    cancelButtonText: "取消"
                }).then(() => {
                    store.dispatch("user/resetToken").then(() => {
                        // 清空Token记录后，刷新页面
                        location.reload();
                    });
                });
            }
            return Promise.reject(new Error(data.message || "Response Code Error"));
        } else {
            return response;
        }
    },
    (error) => {
        console.log("响应错误" + error); // for debug
        ElMessage({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
