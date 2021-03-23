export const proxy = {
    dev: {
        "/api/": {
            target: "https://www.abidu.com",
            changeOrigin: true,
            pathRewrite: {"^": ""}
        }
    },
    test: {
        "/api/": {
            target: "https://www.abidu.com",
            changeOrigin: true,
            pathRewrite: {"^": ""}
        }
    },
    pre: {
        "/api/": {
            target: "https://www.abidu.com",
            changeOrigin: true,
            pathRewrite: {"^": ""}
        }
    }
};
