export async function login(loginInfo) {
    return {
        code: 200,
        message: "ok",
        data: {
            token: "abc"
        }
    };
}

export async function getUserInfo() {
    return {
        code: 200,
        message: "ok",
        data: {
            name: "admin",
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        }
    };
}

export async function logout() {
    return {
        code: 200,
        message: "ok",
        data: {}
    };
}
