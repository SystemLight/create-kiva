"use strict";

const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = "vue3-admin"; // page title

const port = process.env.port || process.env.npm_config_port || 9527; // dev port

/**
 * @typedef PublicPathType
 * @desc url使用定义，三种模式为vue-cli支持的
 * @property {number} development - 开发环境路径
 * @property {string} test - 测试环境部署路径
 * @property {string} production - 发型环境部署路径
 * @type {PublicPathType}
 */
const publicPath = {
    development: "/",
    test: "/",
    production: "/"
};

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    publicPath: publicPath[process.env.NODE_ENV],
    outputDir: "dist",
    assetsDir: "static",
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                "@": resolve("src")
            }
        }
    },
    chainWebpack(config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin("preload").tap(() => [
            {
                rel: "preload",
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: "initial"
            }
        ]);

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete("prefetch");

        config
            .when(process.env.NODE_ENV !== "development",
                config => {
                    config
                        .optimization.splitChunks({
                        chunks: "all",
                        cacheGroups: {
                            libs: {
                                name: "chunk-libs",
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: "initial" // only package third parties that are initially dependent
                            },
                            elementUI: {
                                name: "chunk-elementPlus", // split elementUI into a single package
                                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
                            },
                            commons: {
                                name: "chunk-commons",
                                test: resolve("src/components"), // can customize your rules
                                minChunks: 3, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true
                            }
                        }
                    });
                    // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
                    config.optimization.runtimeChunk("single");
                }
            );
    }
};
