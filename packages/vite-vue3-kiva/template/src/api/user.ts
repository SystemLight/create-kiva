import request from "@/utils/request";

export type LoginDataType = {
    username: string,
    password: string
}

export function login(data: LoginDataType) {
    return request({
        url: "/oauth/login",
        method: "post",
        data
    });
}

export function getInfo() {
    return request({
        url: "/user/info",
        method: "get"
    });
}

export function logout() {
    return request({
        url: "/oauth/logout",
        method: "post"
    });
}
