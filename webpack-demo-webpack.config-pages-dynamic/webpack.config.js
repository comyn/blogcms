// webpack.config.js, 不同目录下加载多个html和js，glob动态加载HtmlWebpackPlugin 多个，且html只加载对应的js文件
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')

// 多页面打包
const setMPA = (globPath) => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, globPath))

  Object.keys(entryFiles).map((index) => {
    console.log(entryFiles)

    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index\.js/)
    // console.log('111:  ' + match[1])
    const pageName = match && match[1]
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        },
        hash: process.env.NODE_ENV === 'production' ? true : false
      })
    )
  })
  // console.log('entryFiles', entryFiles)

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA('./src/*/index.js')

module.exports = {
  // 入口配置
  entry: entry,
  // 出口配置
  output: {
    // 必须是绝对路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]_[chunkhash:8].js'
  },
  // 用来调试，生成map文件的，比如我打包到线上，不生成map，文件会小很多
  devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin() // 如果输出目录没有改动，默认清除dist目录内文件
  ].concat(htmlWebpackPlugins)
}
