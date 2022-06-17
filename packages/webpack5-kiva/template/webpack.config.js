const path = require('path')
const fs = require('fs')

const webpack = require('webpack')

// webpack配置项：https://webpack.js.org/configuration/
class Webpack5RecommendConfig {
  constructor(env, argv) {
    this.mode = argv.mode || 'development' // 模式
    this.isProduction = this.mode === 'production' // 是否为开发环境
    this.cwd = process.cwd() // 当前运行webpack所在位置
    this.srcPath = path.resolve(this.cwd, 'src') // 源码目录文件位置
    this.distPath = path.resolve(this.cwd, 'dist') // 输出文件位置
    this.publicPath = '/' // 发布时URL访问路径
    this.packageJSON = require(path.join(this.cwd, 'package.json')) // package.json文件信息对象
    this.dependencies = Object.keys({
      ...this.packageJSON['devDependencies'],
      ...this.packageJSON['dependencies']
    }) // 项目依赖库数组，用于判定包含什么框架
    this.isTsProject = fs.existsSync(path.join(this.cwd, 'tsconfig.json')) // 是否为ts项目
    this.scriptExt = this.isTsProject ? '.ts' : '.js' // 入口脚本扩展名称
    this.entryDefaultName = 'main' // 入口默认名,webpack默认入口为index.js，输出为main.js
    this.entryDefaultFileName = `${this.entryDefaultName}${this.scriptExt}` // 入口文件默认名称
    this.existsStaticFolderPath = fs.existsSync(path.join(this.cwd, 'public')) // 是否存在public目录
    this.title = 'Webpack App' // 主页标题
    this.enableProfile = false // 是否统计并打印webpack打包详细信息
    this.enableProxy = false // 是否启用代理配置
    this.enableThread = false // 是否启用多线程
    this.config = {}
  }

  build() {
    // webpack5配置文档：https://webpack.js.org/configuration/
    this.buildBasic()
    this.buildInsAndOuts()
    this.buildResolve()
    this.buildDevServer()
    this.buildImprove()
    this.buildRules()
    this.buildPlugins()
    return this
  }

  buildBasic() {
    this.config.mode = this.mode
    this.config.stats = 'errors-only'
    this.config.devtool = this.isProduction ? false : 'eval-source-map'
    this.config.devtool = false
    this.config.context = this.cwd
    if (!this.isProduction) {
      this.config.target = 'web'
    }

    return this
  }

  buildInsAndOuts() {
    this.config.entry = {
      [this.entryDefaultName]: path.join(this.srcPath, this.entryDefaultFileName)
    }

    this.config.output = {
      filename: '[name].bundle.[chunkhash:8].js',
      chunkFilename: '[name].chunk.[chunkhash:8].js',
      assetModuleFilename: 'assets/[name][hash][ext]',
      path: this.distPath,
      publicPath: this.publicPath,
      compareBeforeEmit: false,
      iife: true,
      clean: true
    }

    return this
  }

  buildResolve() {
    this.config.resolve = {
      extensions: ['.js'],
      alias: {
        '@': path.join(this.cwd, 'src')
      }
    }

    if (this.isTsProject) {
      this.config.resolve.extensions.push('.ts')
    }

    if (this.dependencies.includes('react')) {
      this.config.resolve.extensions.push('.jsx')
      if (this.isTsProject) {
        this.config.resolve.extensions.push('.tsx')
      }
    }

    if (this.dependencies.includes('vue')) {
      this.config.resolve.extensions.push('.vue')
    }

    return this
  }

  buildDevServer() {
    // https://webpack.js.org/configuration/dev-server/
    let port = 8080
    this.config.devServer = {
      allowedHosts: 'all',
      historyApiFallback: false,
      host: '0.0.0.0',
      hot: false,
      liveReload: true,
      open: [`http://localhost:${port}/`],
      port: port,
      watchFiles: ['src/**/*'],
      magicHtml: false
    }

    if (this.enableProxy) {
      this.config.devServer.proxy = this.configProxy()
    }

    return this
  }

  buildImprove() {
    this.config.performance = {
      hints: 'warning',
      maxAssetSize: 3 * 1024 * 1024,
      maxEntrypointSize: 3 * 1024 * 1024
    }

    this.config.optimization = {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '~',
        cacheGroups: this.getSplitChunksGroup()
      },
      minimize: this.isProduction,
      minimizer: [
        new (require('terser-webpack-plugin'))() //
      ]
    }

    if (this.isProduction) {
      this.config.optimization.runtimeChunk = 'single'
    }

    return this
  }

  buildRules() {
    this.config.module = {rules: []}

    /**
     * 添加js解析
     */
    let jsUse = ['babel-loader']
    if (this.enableThread) {
      jsUse.unshift('thread-loader')
    }
    this.config.module.rules.push({
      test: /\.js$/,
      exclude: /[\\/]node_modules[\\/]/,
      use: jsUse
    })

    /**
     * 添加jsx解析
     */
    let jsxUse = ['babel-loader']
    if (this.enableThread) {
      jsxUse.unshift('thread-loader')
    }
    this.config.module.rules.push({
      test: /\.jsx$/,
      use: jsxUse
    })

    if (this.isTsProject) {
      /**
       * 添加ts/tsx解析
       */
      let tsUse = [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            // https://github.com/TypeStrong/ts-loader#happypackmode
            happyPackMode: this.enableThread,
            transpileOnly: true,
            compilerOptions: {
              jsx: 'preserve',
              noEmit: true
            }
          }
        }
      ]
      if (this.enableThread) {
        tsUse.unshift('thread-loader')
      }
      this.config.module.rules.push({
        test: /\.tsx?$/,
        use: tsUse
      })
    }

    /**
     * 添加css解析
     */
    this.config.module.rules.push({
      test: /\.css$/,
      use: this.getCssLoader()
    })

    /**
     * 添加sass解析
     */
    this.config.module.rules.push({
      test: /\.s[ca]ss$/,
      use: this.getCssLoader('sass')
    })

    /**
     * 添加图片资源解析
     */
    this.config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/,
      type: 'asset',
      generator: {
        filename: 'images/[name].[hash][ext]'
      }
    })

    /**
     * 添加媒体资源解析
     */
    this.config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset',
      generator: {
        filename: 'media/[name].[hash][ext]'
      }
    })

    /**
     * 添加字体资源解析
     */
    this.config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset',
      generator: {
        filename: 'font/[name].[hash][ext]'
      }
    })

    return this
  }

  buildPlugins() {
    this.config.plugins = []

    if (this.isProduction) {
      /**
       * 将 CSS 提取到单独的文件中
       * https://webpack.js.org/plugins/mini-css-extract-plugin/
       */
      this.config.plugins.push(
        new (require('mini-css-extract-plugin'))({
          filename: '[name].style.[chunkhash:8].css'
        })
      )
    }

    /**
     * 自动添加HTML插件
     * https://github.com/jantimon/html-webpack-plugin
     */
    let htmWebpackPluginOptions = {
      tittle: this.title,
      filename: 'index.html',
      inject: 'body',
      hash: false,
      // https://github.com/terser/html-minifier-terser
      minify: this.isProduction
        ? {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true
        }
        : false
    }
    this.config.plugins.push(new (require('html-webpack-plugin'))(htmWebpackPluginOptions))

    if (this.existsStaticFolderPath) {
      /**
       * 将已存在的单个文件或整个目录复制到构建目录
       * https://webpack.js.org/plugins/copy-webpack-plugin
       */
      this.config.plugins.push(
        new (require('copy-webpack-plugin'))({
          patterns: [
            {
              from: path.join(this.cwd, 'public'),
              to: '.'
            }
          ]
        })
      )
    }

    if (this.enableProfile) {
      /**
       * Elegant ProgressBar and Profiler for Webpack 3 , 4 and 5
       * https://github.com/unjs/webpackbar
       */
      this.config.plugins.push(
        new (require('webpackbar'))({
          reporters: ['fancy', 'profile'],
          profile: true
        })
      )
    } else {
      this.config.plugins.push(new (require('webpackbar'))())
    }

    /**
     * 允许在编译时配置全局常量
     * https://webpack.js.org/plugins/define-plugin
     */
    this.config.plugins.push(
      new webpack.DefinePlugin({
        webpack5RecommendConfigOptions: {
          author: '"SystemLight"'
        }
      })
    )

    /**
     * 在监视模式下忽略指定的文件
     * https://webpack.js.org/plugins/watch-ignore-plugin/
     */
    let ignorePaths = []
    if (this.isTsProject) {
      // https://github.com/TypeStrong/ts-loader#usage-with-webpack-watch
      ignorePaths.push(/\.js$/, /\.d\.ts$/)
    }
    this.config.plugins.push(
      new webpack.WatchIgnorePlugin({
        paths: ignorePaths
      })
    )

    return this
  }

  getSplitChunksGroup() {
    let cacheGroups = {
      common: {
        name: 'common',
        minChunks: 2,
        reuseExistingChunk: true,
        priority: -20
      },
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      }
    }

    if (this.dependencies.includes('vue')) {
      Object.assign(cacheGroups, {
        vue: {
          name: 'vue',
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex)/,
          chunks: 'all',
          enforce: true
        }
      })
    }

    if (this.dependencies.includes('element-ui')) {
      Object.assign(cacheGroups, {
        elementUI: {
          name: 'element-ui',
          test: /[\\/]node_modules[\\/](element-ui)/,
          chunks: 'all'
        }
      })
    }

    if (this.dependencies.includes('react')) {
      Object.assign(cacheGroups, {
        react: {
          name: 'react',
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)/,
          chunks: 'all'
        }
      })
    }

    if (this.dependencies.includes('antd')) {
      cacheGroups = Object.assign(cacheGroups, {
        antd: {
          name: 'antd',
          test: /[\\/]node_modules[\\/](@ant-design|antd)/,
          chunks: 'all'
        }
      })
    }

    return cacheGroups
  }

  getCssLoader(cssPreprocessing) {
    let cssRuleLoaders = []

    if (this.isProduction) {
      cssRuleLoaders.push(require('mini-css-extract-plugin').loader)
    } else {
      cssRuleLoaders.push('style-loader')
    }

    cssRuleLoaders.push('css-loader')

    switch (cssPreprocessing) {
      case 'sass':
        cssRuleLoaders.push('sass-loader')
        break
    }

    return cssRuleLoaders
  }

  configProxy() {
    return {
      // https://github.com/chimurai/http-proxy-middleware
      '/api': {
        target: 'http://localhost:5000/api',
        changeOrigin: true,
        secure: false
      }
    }
  }

  toConfig(debug) {
    if (debug) {
      console.log(this.config)
    }
    return this.config
  }
}

module.exports = (env, argv) => new Webpack5RecommendConfig(env, argv).build().toConfig()
