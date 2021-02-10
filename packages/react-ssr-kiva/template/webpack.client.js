const ph = require("path");

module.exports = {
    mode: "production",
    target: ["web", "es5"],
    context: __dirname,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
        alias: {
            "@": ph.join(__dirname, "src"),
            "@@": ph.join(__dirname, "src/pages"),
            "config": ph.join(__dirname, "config/index.tsx"),
            "kiva": ph.join(__dirname, "kiva")
        }
    },
    entry: "./src/client.tsx",
    output: {
        filename: "client.js",
        path: ph.resolve(__dirname, "wwwroot"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.tsx?$/,
                use: ["babel-loader", "ts-loader"]
            }
        ]
    }
};
