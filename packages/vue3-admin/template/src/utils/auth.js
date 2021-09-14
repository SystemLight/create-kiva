const tokenKey = "vue3-admin-token";

export function getToken() {
    return localStorage.getItem(tokenKey);
}

export function setToken(token) {
    localStorage.setItem(tokenKey, token);
}

export function removeToken() {
    localStorage.removeItem(tokenKey);
}
