"use strict";

const path = require("path");

/**
 * 配置参考：
 *      https://cli.vuejs.org/config/
 *      https://github.com/browserslist/browserslist
 */

// 页面初始标题
const name = "vue3-admin";

// 开发端口
const port = process.env.port || process.env.npm_config_port || 9527;

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

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: publicPath[process.env.NODE_ENV],
    outputDir: "dist",
    assetsDir: "rely",
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
        config.plugin("preload").tap(() => [
            {
                rel: "preload",
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: "initial"
            }
        ]);
        config.plugins.delete("prefetch");
        config.when(
            process.env.NODE_ENV !== "development",
            (config) => {
                config
                    .optimization.splitChunks({
                    chunks: "all",
                    cacheGroups: {
                        libs: {
                            name: "chunk-libs",
                            test: /[\\/]node_modules[\\/]/,
                            priority: 10,
                            chunks: "initial"
                        },
                        elementUI: {
                            name: "chunk-elementPlus",
                            priority: 20,
                            test: /[\\/]node_modules[\\/]_?element-plus(.*)/
                        },
                        commons: {
                            name: "chunk-commons",
                            test: resolve("src/components"),
                            minChunks: 3,
                            priority: 5,
                            reuseExistingChunk: true
                        }
                    }
                });
                // https://webpack.js.org/configuration/optimization/#optimizationruntimechunk
                config.optimization.runtimeChunk("single");
            }
        );
    }
};
