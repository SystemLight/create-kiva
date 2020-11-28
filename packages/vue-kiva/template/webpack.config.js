const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const ph = require("path");

/*
    获取开发服务器配置信息
 */
const getDevServer = {
    contentBase: "build",
    index: "index.html",
    open: false,
    openPage: "",
    inline: true,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
    disableHostCheck: false,
    writeToDisk: false,
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
    maxSize: 3145728,
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
        vue: {
            name: "vue",
            test: /[\\/]node_modules[\\/](vue|vue-router|vuex)/,
            chunks: "all",
            enforce: true
        },
        elementUI: {
            name: "element-ui",
            test: /[\\/]node_modules[\\/](element-ui)/,
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

    /*
        根据开发环境获取相对插件
     */
    const getPlugin = function() {
        const productPlugin = [
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css"
            })
        ];

        const developmentPlugin = [];

        let basic = [
            new VueLoaderPlugin(),
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
            new HtmlWebpackPlugin({
                hash: false,
                filename: "index.html",
                template: "./src/config/index.html",
                inject: true,
                minify: getMinify
            })
        ];

        if (isProduction) {
            basic = basic.concat(productPlugin);
        } else {
            basic = basic.concat(developmentPlugin);
        }

        return basic;
    };

    // 判断环境是否需要压缩文件，移除空白和注释等操作
    const getMinify = isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
    } : undefined;

    // 生产环境提取CSS代码到文件中
    const getCssUseLoader = function(less = false) {
        const basic = [
            "css-loader",
            "postcss-loader"
        ];
        if (isProduction) {
            basic.unshift(MiniCssExtractPlugin.loader);
        } else {
            basic.unshift("style-loader");
        }
        if (less) {
            basic.push({
                loader: "less-loader",
                options: {
                    lessOptions: {javascriptEnabled: true}
                }
            });
        }

        return basic;
    };

    return {
        mode: mode,
        devtool: isProduction ? false : "cheap-module-source-map",
        resolve: {
            extensions: [".js", ".ts", "vue"],
            alias: {
                "@": ph.join(__dirname, "src"),
                "@@": ph.join(__dirname, "src/pages"),
                "config": ph.join(__dirname, "src/config"),
                "kiva": ph.join(__dirname, "kiva")
            }
        },
        devServer: getDevServer,
        optimization: {
            splitChunks: splitChunks,
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
        },
        performance: {
            maxAssetSize: 3 * 1024 * 1024,
            maxEntrypointSize: 3 * 1024 * 1024
        },
        entry: "./src/index.ts",
        output: {
            filename: isProduction ? "js/[name].[chunkhash:8].js" : "js/[name].[fullhash:8].js",
            path: ph.resolve(__dirname, "build"),
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: ["babel-loader", "ts-loader"]
                },
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: "vue-loader",
                            options: {
                                hotReload: false
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: getCssUseLoader()
                },
                {
                    test: /\.less$/,
                    use: getCssUseLoader(true)
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                                fallback: "file-loader",
                                name: "images/[name].[fullhash:8].[ext]",
                                publicPath: "/",
                                esModule: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "font/[name].[fullhash:8].[ext]",
                                publicPath: "/",
                                esModule: false
                            }
                        }
                    ]
                }
            ]
        },
        plugins: getPlugin()
    };
};
