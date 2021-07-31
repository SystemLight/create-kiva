module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/static" : "/",
    devServer: {
        proxy: "http://localhost:5555"
    },
    chainWebpack(config) {
        config
            .plugin("html")
            .tap((args) => {
                args[0].title = "标题";
                return args;
            });
    }
};
