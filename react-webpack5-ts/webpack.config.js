const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ph = require("path");

const AgreedRoutingPlugin = require("./scripts/agreed-routing-plugin");

/*
    获取开发服务器配置信息
 */
const getDevServer = {
    contentBase: "build",
    index: "index.html",
    open: true,
    openPage: "",
    inline: true,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
    disableHostCheck: false,
    writeToDisk: false,
    transportMode: "ws",
    proxy: {
        "/proxy": {
            target: "http://127.0.0.1",
            pathRewrite: {"^/proxy": ""},
            changeOrigin: true
        }
    }
};

/*
    手动分割代码块
 */
const splitChunks = {
    chunks: "async",
    minSize: 30720,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 6,
    maxInitialRequests: 4,
    automaticNameDelimiter: "-",
    cacheGroups: {
        common: {
            name: "common",
            chunks: "all",
            priority: -20,
            minChunks: 2,
            reuseExistingChunk: true
        },
        vendors: {
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            priority: -10
        },
        react: {
            name: "react",
            test: /[\\/]node_modules[\\/](scheduler|react|react-dom|prop-types)/,
            chunks: "all",
            enforce: true
        },
        antd: {
            name: "antd",
            test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
            chunks: "all"
        },
        styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true
        }
    }
};

module.exports = function(env, argv) {
    const mode = argv.mode || "development";
    const isProduction = mode === "production";
    console.log("Current mode: " + mode);

    // 判断环境是否需要压缩文件，移除空白和注释等操作
    const getMinify = isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
    } : undefined;

    return {
        mode: mode,
        devtool: isProduction ? false : "cheap-module-source-map",
        context: __dirname,
        resolve: {
            extensions: [".js", ".ts", ".jsx", ".tsx"],
            alias: {
                "@": ph.join(__dirname, "src"),
                "@v": ph.join(__dirname, "src/views"),
                "@c": ph.join(__dirname, "core")
            }
        },
        devServer: getDevServer,
        optimization: {
            // splitChunks: splitChunks,
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
        },
        performance: {
            maxAssetSize: 3 * 1024 * 1024,
            maxEntrypointSize: 3 * 1024 * 1024
        },
        entry: "./src/index.tsx",
        output: {
            filename: isProduction ? "js/[name].[chunkhash:8].js" : "js/[name].[hash:8].js",
            path: ph.resolve(__dirname, "build"),
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    // FIX: https://github.com/babel/babel/issues/12058
                    test: /\.m?js/,
                    resolve: {
                        fullySpecified: false
                    }
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: ["babel-loader", "ts-loader"]
                },
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                                fallback: "file-loader",
                                name: "images/[name].[hash:8].[ext]",
                                publicPath: "/",
                                esModule: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "font/[name].[hash:8].[ext]",
                                publicPath: "/",
                                esModule: false
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: __dirname + "/public",
                        to: __dirname + "/build",
                        globOptions: {
                            ignore: [".*"]
                        }
                    }
                ]
            }),
            // css 会被打到 js 里，而不是以单独的 css 文件出现，
            // 因为 mini-css-extract-plugin 和 webpack@5 的物理缓存有冲突
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css"
            }),
            new HtmlWebpackPlugin({
                hash: false,
                filename: "index.html",
                template: "./src/index.html",
                inject: true,
                minify: getMinify
            }),
            // 启用约定式路由，手动配置的路由将会被替换
            new AgreedRoutingPlugin({
                base: "", // 项目需要部署到CDN或者非根目录时，指定该项，使路由匹配增加前缀
                filePath: "src/config.tsx", // 入口文件路径
                viewsPath: "src/views", // 约定式路由结构文件夹路径
                enable: true,
                ignore: []
            })
        ]
    };
};
