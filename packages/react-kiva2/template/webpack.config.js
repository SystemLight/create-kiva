const ph = require("path");
const fs = require("fs");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBar = require("webpackbar");
const webpack = require("webpack");
const Mock = require("mockjs");

const MockServer = require("./mocks/mock-server");

/**
 * 获取开发服务器配置信息
 * 更多配置：https://webpack.js.org/configuration/dev-server/
 */
const devServer = {
    // 当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息
    clientLogLevel: "silent",

    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
    quiet: true,

    // 参考：https://www.webpackjs.com/configuration/stats/#stats
    stats: "errors-only",

    // 诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏
    noInfo: true,

    // 出现编译器错误或警告时，在浏览器中显示全屏覆盖
    overlay: true,

    // 是否自动打开浏览器预览
    open: false,

    // 打开浏览器的显示URL路径
    openPage: "",

    // The Unix socket to listen to (instead of a host)
    // socket: "socket",

    // 此模式使用ws作为服务器，并在客户端上使用本机WebSocket
    transportMode: "ws",

    // 启动时通过ZeroConf网络广播服务器
    // bonjour:true,

    // 添加访问服务器白名单
    // allowedHosts: [],

    // 此选项将绕过主机检查，不建议这样做，因为不检查主机的应用容易受到DNS重新绑定攻击的攻击
    disableHostCheck: false,

    // 一切服务都启用gzip 压缩
    // compress: false,

    // 在所有响应中添加首部内容
    // headers: {},

    // mime文件映射表
    // mimeTypes: {},

    // 当使用内联模式(inline mode)并代理 dev-server 时，内联的客户端脚本并不总是知道要连接到什么地方
    // public: "",

    // 此路径下的打包文件可在浏览器中访问
    // publicPath: "",

    // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
    contentBase: "build",

    // 将指定URL映射成contentBase访问
    // contentBasePublicPath: "/serve-content-base-at-this-url",

    // 告诉服务器监听文件变化路径位置
    // watchContentBase: "",

    // 检测文件配置高级选项
    // watchOptions: {},

    // 静态文件高级配置
    // staticOptions: {},

    // 告诉devServer将编译内容写入磁盘
    writeToDisk: false,

    // 默认访问文件
    index: "index.html",

    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: true,

    // 在惰性模式，每个请求结果都会产生全新的编译
    // lazy: true,

    // 在惰性模式中，此选项可减少编译，使用 filename，可以只在某个文件被请求时编译
    // filename: "bundle.js",

    // 在 dev-server 的两种不同模式之间切换
    inline: true,

    // 检测到文件更改是否刷新浏览器
    // liveReload: true,

    // 启用 webpack 的模块热替换特性
    hot: false,

    // 是否在构建失败时将页面刷新作为后备选择
    hotOnly: false,

    // 使用http2服务
    // http2: true,

    // 带有 HTTPS 的 HTTP/2 提供服务
    // https: true,

    // 指定SSL .pfx文件的路径
    // pfx: "",

    // The passphrase to a SSL PFX file
    // pfxPassphrase: "passphrase",

    // 此选项使浏览器可以使用您的本地IP打开
    // useLocalIp: true,

    // 如果希望局域网IP访问可以添加参数
    // host: "0.0.0.0",

    // 指定要监听请求的端口号
    port: 8080,

    // 配置代理服务设置，/proxy前缀会走代理
    proxy: {
        "/proxy": {
            target: "http://127.0.0.1:5000",
            pathRewrite: {"^/proxy": ""},
            changeOrigin: true,
            secure: false,
            autoRewrite: true,
            hostRewrite: "localhost:8080/proxy",
            protocolRewrite: null
        }
    },

    // 提供在服务器内部先于所有其他中间件执行自定义中间件的功能，可以自定义处理
    before(app) {
        const hasSimpleMock = fs.existsSync("./mocks.json");
        // 根目录下不存在mocks.json文件时使用mocks下的server进行复杂mock处理
        if (hasSimpleMock) {
            const mockData = require("./mocks.json");
            // mocks.json配置请求统一路径为/mock开头
            app.get(/\/mock(.*)$/, function(req, res) {
                const {"0": url} = req.params;
                const data = Mock.mock(mockData[url]);
                if (data) {
                    res.json(data);
                } else {
                    res.status(404).json({});
                }
            });
        } else {
            MockServer(app);
        }
    }
};

/**
 * 切割代码块规则配置
 * 更多配置：https://webpack.js.org/plugins/split-chunks-plugin/
 */
const splitChunks = {
    // 指定对哪些块进行分割优化
    chunks: "async",

    // 分割块的名称
    // name: false,

    // 自动生成的名称连接符号
    automaticNameDelimiter: "-",

    // Sets the size types which are used when a number is used for sizes
    // defaultSizeTypes: ["javascript", "unknown"],

    // Prevents exposing path info when creating names for parts splitted by maxSize
    // hidePathInfo: true,

    // [cacheGroups]-强制执行拆分Chunk
    // enforceSizeThreshold: true,

    // [cacheGroups]-Assign modules to a cache group by module layer
    // layer: "",

    // [cacheGroups]-Figure out which exports are used by modules to mangle export names, omit unused exports and generate more efficient code
    // usedExports: true,

    // 按需加载时并行请求的最大数量
    // maxAsyncRequests: 30,

    // 入口点的最大并行请求数
    // maxInitialRequests: 30,

    // 拆分之前，模块被共享的最小次数
    // minChunks: 1,

    // 生成块的限制（以字节为单位）
    // minSize: 20000,
    // maxSize: 3145728,
    // maxAsyncSize: 3145728,

    // [cacheGroups]-确保拆分后剩余的最小块大小超过限制来，避免大小为零的模块
    // minRemainingSize: 0,

    // 继承或覆盖splitChunks中的任何选项
    cacheGroups: {
        common: {
            name: "common",
            chunks: "all",
            priority: -20,
            minChunks: 2,
            reuseExistingChunk: true // 重用已从主捆绑包中拆分出的模块
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

/**
 * 获取加载Loader配置规则
 * @param {boolean} isProduction
 * @return {any}
 */
const getRules = function(isProduction) {
    // 获取生产环境和开发环境CSS Loader配置
    const getCssLoader = function(isProduction, less = false) {
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

    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["thread-loader", "babel-loader"]
        },
        {
            test: /\.jsx$/,
            use: ["thread-loader", "babel-loader"]
        },
        {
            test: /\.tsx?$/,
            use: [
                "thread-loader",
                "babel-loader",
                {
                    loader: "ts-loader",
                    options: {
                        // https://github.com/TypeStrong/ts-loader#happypackmode
                        transpileOnly: true,
                        happyPackMode: true,
                        compilerOptions: {
                            jsx: "preserve"
                        }
                    }
                }
            ]
        },
        {
            test: /\.css$/,
            use: getCssLoader(isProduction)
        },
        {
            test: /\.less$/,
            use: getCssLoader(isProduction, true)
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            issuer: /\.tsx?$/,
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
                    loader: "file-loader",
                    options: {
                        name: "images/[name].[ext]",
                        publicPath: "/",
                        esModule: false
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 8 * 1024
                }
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: "asset/resource",
            generator: {
                filename: "font/[hash][ext][query]"
            }
        }
    ];
};

/**
 * 根据开发环境获取相对插件
 * @param {boolean} isProduction
 * @return {any}
 */
const getPlugins = function(isProduction) {
    // 生产环境插件
    const productPlugin = [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css"
        })
    ];

    // 开发环境插件
    const developmentPlugin = [
        new WebpackBar(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ["Your application is running here: http://localhost:8080"]
            }
        }),
        // FIX: `react-dev-utils` is missing a variable definition in Webpack5
        // Ref: https://webpack.js.org/migrate/5/#run-a-single-build-and-follow-advises
        new webpack.DefinePlugin({
            "process.platform": JSON.stringify(process.platform),
            "process.env.TERM": JSON.stringify(process.env.TERM),
            "process.env.WDS_SOCKET_HOST": JSON.stringify(process.env.WDS_SOCKET_HOST),
            "process.env.WDS_SOCKET_PORT": JSON.stringify(process.env.WDS_SOCKET_PORT),
            "process.env.WDS_SOCKET_PATH": JSON.stringify(process.env.WDS_SOCKET_PATH)
        }),
        // https://github.com/TypeStrong/ts-loader#usage-with-webpack-watch
        new webpack.WatchIgnorePlugin({
            paths: [
                /\.js$/,
                /\.d\.ts$/
            ]
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
            template: "./template.ejs",
            inject: true,
            minify: isProduction ? {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true
            } : undefined
        })
    ];

    if (isProduction) {
        basic = basic.concat(productPlugin);
    } else {
        basic = basic.concat(developmentPlugin);
    }

    return basic;
};

/**
 * webpack 核心配置
 * @param {any} env
 * @param {any} argv
 * @return {any}
 */
module.exports = function(env, argv) {
    const mode = argv.mode || "development";
    const isProduction = mode === "production";

    return {
        mode: mode,
        target: isProduction ? ["web", "es5"] : "web",
        stats: "errors-only",
        devtool: isProduction ? false : "cheap-module-source-map",
        context: __dirname,
        resolve: {
            extensions: [".js", ".ts", ".jsx", ".tsx"],
            alias: {
                "@": ph.join(__dirname, "src"),
                "@@": ph.join(__dirname, "src/pages")
            }
        },
        devServer: devServer,
        optimization: {
            splitChunks: splitChunks,
            minimize: isProduction,
            minimizer: [
                new TerserJSPlugin(),
                new OptimizeCSSAssetsPlugin()
            ]
        },
        performance: {
            maxAssetSize: 3 * 1024 * 1024,
            maxEntrypointSize: 3 * 1024 * 1024
        },
        entry: isProduction ? "./src/main.ts" : [
            require.resolve("react-dev-utils/webpackHotDevClient"),
            "./src/main.ts"
        ],
        output: {
            filename: isProduction ? "js/[name].[chunkhash:8].js" : "js/[name].[fullhash:8].js",
            path: ph.resolve(__dirname, "build"),
            assetModuleFilename: "images/[hash][ext][query]",
            publicPath: "/"
        },
        module: {
            rules: getRules(isProduction)
        },
        plugins: getPlugins(isProduction)
    };
};
