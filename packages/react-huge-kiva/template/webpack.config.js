const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
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

const ph = require("path");

const AgreedRoutePlugin = require("./kiva/scripts/agreed-route-plugin");
const AgreedModelPlugin = require("./kiva/scripts/agreed-model-plugin");

/**
 * 获取开发服务器配置信息
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

    // 检测dao到文件更改是否刷新浏览器
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

    // 配置代理服务设置
    proxy: {
        "/proxy": {
            target: "http://127.0.0.1",
            pathRewrite: {"^/proxy": ""},
            changeOrigin: true
        }
    },

    // 提供在服务器内部先于所有其他中间件执行自定义中间件的功能，可以自定义处理
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
    },

    // 提供在服务器内部在所有其他中间件之后执行自定义中间件的功能
    after(app) {
    }
};

/**
 * 切割代码块规则配置
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

/**
 * 获取生产环境和开发环境CSS Loader配置
 * @param {boolean} isProduction
 * @param {boolean} less
 * @return {any}
 */
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

/**
 * 获取加载Loader配置规则
 * @param {boolean} isProduction
 * @return {any}
 */
const getRules = function(isProduction) {
    return [
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
            exclude: /node_modules/,
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
            use: [
                {
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        fallback: "file-loader",
                        name: "images/[name].[ext]",
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
                        name: "font/[name].[ext]",
                        publicPath: "/",
                        esModule: false
                    }
                }
            ]
        }
    ];
};

/**
 * 根据开发环境获取相对插件
 * @param {boolean} isProduction
 * @return {any}
 */
const getPlugin = function(isProduction) {
    // 并行loader转换
    const parallel = [];

    // 生产环境插件
    const productPlugin = [
        new BundleAnalyzerPlugin(),
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
        ...parallel,
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
            minify: isProduction ? {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true
            } : undefined
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
        devServer: devServer,
        optimization: {
            splitChunks: splitChunks,
            minimize: isProduction,
            minimizer: [
                new TerserJSPlugin({}),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        performance: {
            maxAssetSize: 3 * 1024 * 1024,
            maxEntrypointSize: 3 * 1024 * 1024
        },
        entry: isProduction ? "./src/app.tsx" : [
            require.resolve("react-dev-utils/webpackHotDevClient"),
            "./src/app.tsx"
        ],
        output: {
            filename: isProduction ? "js/[name].[chunkhash:8].js" : "js/[name].[fullhash:8].js",
            path: ph.resolve(__dirname, "build"),
            publicPath: "/"
        },
        module: {
            rules: getRules(isProduction)
        },
        plugins: getPlugin(isProduction)
    };
};
