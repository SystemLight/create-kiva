const proxy = {
    dev: {
        "/api/": {
            target: "https://www.baidu.com",
            changeOrigin: true,
            pathRewrite: {"^": ""}
        }
    },
    test: {
        "/api/": {
            target: "https://www.baidu.com",
            changeOrigin: true,
            pathRewrite: {"^": ""}
        }
    },
    pre: {
        "/api/": {
            target: "https://www.baidu.com",
            changeOrigin: true,
            pathRewrite: {"^": ""}
        }
    }
};

export default proxy;
