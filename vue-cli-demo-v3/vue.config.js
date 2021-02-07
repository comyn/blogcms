const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

let glob = require('glob')
//配置pages多页面获取当前文件夹下的html和ts
function getEntry(globPath) {
  let entries = {},
    tmp,
    htmls = {}
  // 读取src/pages/**/底下所有的html文件
  glob.sync(globPath + 'html').forEach(function(entry) {
    tmp = entry.split('/').splice(-3)
    htmls[tmp[1]] = entry
  })
  // 读取src/pages/**/底下所有的ts文件
  glob.sync(globPath + 'js').forEach(function(entry) {
    tmp = entry.split('/').splice(-3)
    console.log('=====' + `public/${tmp[1]}`)
    entries[tmp[1]] = {
      entry,
      //  当前目录没有有html则以共用的public/index.html作为模板
      template: htmls[tmp[1]] ? htmls[tmp[1]] : 'index.html',
      //  以文件夹名称.html作为访问地址
      filename: tmp[1] + '.html'
    }
  })
  return entries
}
let htmls = getEntry('./src/pages/**/*.')

module.exports = {
  // 默认是/,如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  outputDir: 'dist',
  //放置生成的静态资源(js、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  // assetsDir: '',
  //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  indexPath: 'index.html',
  // 用于多页配置，默认是 undefined
  pages: htmls,

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,
  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  runtimeCompiler: false,
  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [
    /* string or regex */
  ],
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: () => {},
  configureWebpack: (config) => {
    // if (process.env.NODE_ENV === 'production') {
    //   // 为生产环境修改配置...
    //   config.mode = 'production'
    //   // 将每个依赖包打包成单独的js文件
    //   var optimization = {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //       chunks: 'all',
    //       maxInitialRequests: Infinity,
    //       minSize: 20000, // 依赖包超过20000bit将被单独打包
    //       cacheGroups: {
    //         vendor: {
    //           test: /[\\/]node_modules[\\/]/,
    //           name(module) {
    //             // get the name. E.g. node_modules/packageName/not/this/part.js
    //             // or node_modules/packageName
    //             const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
    //             // npm package names are URL-safe, but some servers don't like @ symbols
    //             return `npm.${packageName.replace('@', '')}`
    //           }
    //         }
    //       }
    //     },
    //     minimizer: [
    //       new UglifyPlugin({
    //         uglifyOptions: {
    //           compress: {
    //             warnings: false,
    //             drop_console: true, // console
    //             drop_debugger: false,
    //             pure_funcs: ['console.log'] // 移除console
    //           }
    //         }
    //       })
    //     ]
    //   }
    //   Object.assign(config, {
    //     optimization
    //   })
    // } else {
    //   // 为开发环境修改配置...
    //   config.mode = 'development'
    //   var optimization2 = {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //       chunks: 'all',
    //       maxInitialRequests: Infinity,
    //       minSize: 20000, // 依赖包超过20000bit将被单独打包
    //       cacheGroups: {
    //         vendor: {
    //           test: /[\\/]node_modules[\\/]/,
    //           name(module) {
    //             // get the name. E.g. node_modules/packageName/not/this/part.js
    //             // or node_modules/packageName
    //             const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
    //             // npm package names are URL-safe, but some servers don't like @ symbols
    //             return `npm.${packageName.replace('@', '')}`
    //           }
    //         }
    //       }
    //     }
    //   }
    //   Object.assign(config, {
    //     // 开发生产共同配置
    //     // externals: {
    //     //   'vue': 'Vue',
    //     //   'element-ui': 'ELEMENT',
    //     //   'vue-router': 'VueRouter',
    //     //   'vuex': 'Vuex'
    //     // }
    //     // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(用于csdn引入)
    //     resolve: {
    //       extensions: ['.js', '.vue', '.json'], //文件优先解析后缀名顺序
    //       alias: {
    //         '@': path.resolve(__dirname, './src'),
    //         '@c': path.resolve(__dirname, './src/components'),
    //         '@v': path.resolve(__dirname, './src/views'),
    //         '@u': path.resolve(__dirname, './src/utils'),
    //         '@s': path.resolve(__dirname, './src/service')
    //       }, // 别名配置
    //       plugins: []
    //     },
    //     optimization: optimization2
    //   })
    // }
  },

  // css相关配置
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // css预设器配置项, 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: false
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa
  pwa: {},

  // 配置 webpack-dev-server 行为。
  devServer: {
    //配置自动启动浏览器
    open: true, //process.platform === 'darwin',
    // 环境配置
    // host: 'localhost',
    port: 8080,
    // index: '/index.html', //  默认启动页面
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://localhost:8880',
        /* 允许跨域 */
        changeOrigin: true,
        secure: false,
        // ws: true,
        pathRewrite: {
          '^/api': '/static/mock' // 请求数据路径别名,这里是注意将static/mock放入public文件夹
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  // 三方插件的选项
  pluginOptions: {}
}
