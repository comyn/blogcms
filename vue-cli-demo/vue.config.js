const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const { generateDefaultEntry, generateEntries } = require('./mutiple-entry')

module.exports = {
  // 默认是/,如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
  publicPath: IS_PROD ? '/' : '/',
  // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  outputDir: 'dist',
  //放置生成的静态资源(js、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  assetsDir: 'static',
  //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  indexPath: 'index.html',
  // 用于多页配置，默认是 undefined
  // 构建多页面应用，页面的配置
  // pages: Object.assign({}, generateDefaultEntry(), generateEntries()),
  //文件名哈希值
  filenameHashing: true,
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  //组件是如何被渲染到页面中的？ （ast：抽象语法树；vDom：虚拟DOM）
  //template ---> ast ---> render ---> vDom ---> 真实的Dom ---> 页面
  //runtime-only：将template在打包的时候，就已经编译为render函数
  //runtime-compiler：在运行的时候才去编译template
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
  productionSourceMap: !IS_PROD,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  configureWebpack: () => {},

  chainWebpack: (config) => {
    config.resolve.alias
      // .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('@buy', resolve('src/pages/buy'))
      .set('@rent', resolve('src/pages/rent'))
      .set('@pc', resolve('src/pages/pc'))

    if (!IS_PROD) {
      config.output.filename((bundle) => {
        return bundle.chunk.name === 'index' ? 'js/[name].js' : '[name]/[name].js'
      })
    }

    if (IS_PROD) {
      config.output.filename((bundle) => {
        return bundle.chunk.name === 'index' ? 'js/[name].[contenthash:8].js' : '[name]/[name].[contenthash:8].js'
      })
    }
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
    open: true, //编译后默认打开浏览器
    host: '0.0.0.0', //域名
    port: 8080, // 端口
    // index: '/index.html', //  默认启动页面
    https: false, //是否https
    hotOnly: false,
    //显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://asoyy.xyz',
        /* 允许跨域 */
        changeOrigin: true,
        ws: false, //是否支持websocket
        secure: false, //如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/api': ''
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
