import axios from "axios";
import qs from "qs";
import {v1} from "uuid";

import router from "@/router";
import store from "@/store";

const service = axios.create({
    baseURL: "/api"
});

service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
        }
        return config;
    }
);

service.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        if (err.response) {
            if (err.response.status === 401) {
                // 当返回401即代表token失效，所以删除本地所有令牌存储即可
                store.commit("auth/logout");
            }
        }

        return Promise.reject(err);
    }
);

export async function upload(url, file, onProcess) {
    const chunkSize = 3145728;
    const fileSize = file.size;
    let currentChunk = 0;
    const totalChunks = Math.ceil(fileSize / chunkSize);
    const formID = v1();
    let result = {};

    for (; currentChunk < totalChunks; currentChunk++) {
        const offset = currentChunk * chunkSize;
        const currentChunkSize = (currentChunk + 1) * chunkSize;

        const fd = new FormData();

        fd.append("totalChunks", totalChunks);
        fd.append("offset", offset);

        fd.append("chunkBlock", file.slice(offset, currentChunkSize));
        fd.append("chunkID", currentChunk);

        fd.append("fileID", formID);
        fd.append("fileName", file.name);
        fd.append("fileSize", fileSize);

        const {data} = await axios.post(url, fd);
        result = data;

        onProcess && onProcess(parseInt((currentChunk / totalChunks) * 100), fd);
    }

    return result;
}

export async function getUser(key) {
    return {
        data: {
            data: {
                id: -1,
                avatar: null,
                create_at: null,
                name: null,
                phone: null,
                priority: 0
            }
        }
    };
}

export async function login(loginForm) {
    return {data: {data: {token: "token"}}};
}

export async function sendSms(phone) {
    return await service.post("/oauth/captcha", qs.stringify({phone}));
}

export async function logout(phone) {
    return {};
}
