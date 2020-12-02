const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Mock = require("mockjs");
const webpack = require("webpack");

const ph = require("path");

const AgreedRoutePlugin = require("./kiva/scripts/agreed-route-plugin");
const AgreedModelPlugin = require("./kiva/scripts/agreed-model-plugin");

/*
    获取开发服务器配置信息，如果希望局域网IP访问可以添加参数 host: "0.0.0.0"
 */
const getDevServer = {
    compress: true,
    contentBase: "build",
    index: "index.html",
    port: 8080,
    overlay: true,
    open: false,
    openPage: "",
    inline: true,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
    disableHostCheck: false,
    writeToDisk: false,
    transportMode: "ws",
    quiet: false,
    noInfo: false,
    stats: {
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        entrypoints: false,
        hash: false,
        modules: false,
        timings: false,
        version: false
    },
    proxy: {
        "/proxy": {
            target: "http://127.0.0.1",
            pathRewrite: {"^/proxy": ""},
            changeOrigin: true
        }
    },
    before(app) {
        try {
            const mockData = require("./mocks.json");
            app.get(/\/mock(.*)$/, function(req, res) {
                const {"0": url} = req.params;
                const data = Mock.mock(mockData[url]);
                if (data) {
                    res.json(data);
                } else {
                    res.status(404).json({});
                }
            });
        } catch (e) {
            // 根目录下不存在mocks.json文件时不进行注册mock代理，
            // 启用mock代理请配置代理选项将/proxy代理到本机/mock下
        }
    }
};

/*
    切割代码块规则配置
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
        react: {
            name: "react",
            test: /[\\/]node_modules[\\/](scheduler|react|react-dom|prop-types)/,
            chunks: "all",
            enforce: true
        },
        antd: {
            name: "antd",
            test: /[\\/]node_modules[\\/](@ant-design|antd)/,
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
        // 生产环境插件
        const productPlugin = [
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css"
            })
        ];

        // 开发环境插件
        const developmentPlugin = [
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: ["Your application is running here: http://localhost:8080"]
                }
            }),
            // FIX: webpack5 process is undefined
            new webpack.DefinePlugin({
                "process.platform": JSON.stringify(process.platform),
                "process.env.TERM": JSON.stringify(process.env.TERM),
                "process.env.WDS_SOCKET_HOST": JSON.stringify(process.env.WDS_SOCKET_HOST),
                "process.env.WDS_SOCKET_PORT": JSON.stringify(process.env.WDS_SOCKET_HOST),
                "process.env.WDS_SOCKET_PATH": JSON.stringify(process.env.WDS_SOCKET_PATH)
            })
        ];

        // 通用插件
        let basic = [
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
                template: "./src/pages/index.ejs",
                inject: true,
                minify: getMinify
            }),
            // 启用约定式路由，手动配置的路由将会被替换
            new AgreedRoutePlugin({
                base: "", // 项目需要部署到CDN或者非根目录时，指定该项，使路由匹配增加前缀
                filePath: "config/index.tsx", // 入口文件路径
                viewsPath: "src/pages", // 约定式路由结构文件夹路径
                enable: true,
                ignore: []
            }),
            // 启用约定式状态模型自注册，自动生成状态模型接口
            new AgreedModelPlugin({
                enable: true,
                modelsPath: "src/models"
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
        stats: "errors-only",
        devtool: isProduction ? false : "cheap-module-source-map",
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
        devServer: getDevServer,
        optimization: {
            splitChunks: splitChunks,
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
        },
        performance: {
            maxAssetSize: 3 * 1024 * 1024,
            maxEntrypointSize: 3 * 1024 * 1024
        },
        entry: isProduction ? "./src/index.tsx" : [
            require.resolve("react-dev-utils/webpackHotDevClient"),
            "./src/index.tsx"
        ],
        output: {
            filename: isProduction ? "js/[name].[chunkhash:8].js" : "js/[name].[fullhash:8].js",
            path: ph.resolve(__dirname, "build"),
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
                    exclude: /node_modules/,
                    use: ["babel-loader", "ts-loader"]
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
                    issuer: /\.tsx?$/,
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        "babel-loader",
                        {
                            loader: "@svgr/webpack",
                            options: {
                                babel: false,
                                icon: true
                            }
                        },
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
