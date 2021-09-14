import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import store from "@/store";
import {getToken} from "./auth";

const baseURL = {
    development: "/api",
    test: "/api",
    production: "/api"
};

const service = axios.create({
    baseURL: baseURL[process.env.NODE_ENV],
    timeout: 30000
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
    (config) => {
        if (store.getters.token) {
            // X-Token 是自定义验证请求头
            config.headers["X-Token"] = getToken();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
    (response) => {
        // 获取响应内容，自定义响应
        const res = response.data;

        if (res.code !== 200) {
            ElMessage({
                type: "error",
                message: res.message || "#02 响应错误",
                duration: 5 * 1000
            });

            // 400: 错误请求; 401: 未授权; 403: 禁止访问
            if (res.code === 400 || res.code === 401 || res.code === 403) {
                ElMessageBox.confirm(
                    "您已退出，您可以取消停留在此页面，或重新登录",
                    "确定注销",
                    {
                        type: "warning",
                        confirmButtonText: "重新登录",
                        cancelButtonText: "取消"
                    }
                ).then(() => {
                    store.dispatch("user/resetToken").then(() => {
                        location.reload();
                    });
                });
            }

            return Promise.reject(new Error(res.message || "#03 响应错误"));
        }

        return res;
    },
    (error) => {
        ElMessage({
            type: "error",
            message: error.message,
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
