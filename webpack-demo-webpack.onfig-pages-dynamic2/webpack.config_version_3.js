// webpack.config.js, 同一个目录下加载多个html和js，glob动态加载HtmlWebpackPlugin 多个，且html只加载对应的js文件
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const glob = require('glob')
let chunks = []
let getentries = function () {
  var entryFiles = glob.sync('./src/**/*.js')
  var map = {}

  for (var i = 0; i < entryFiles.length; i++) {
    var filePath = entryFiles[i]
    var filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
    //得到map={'pageA':'./src/js/pageA.js','pageB':'./src/js/pageB.js'}
    chunks.push(filename) //chunks = ['pageA','pageB']
  }
  return map
}
let entries = getentries()

let getHtml = function () {
  var HtmlWebpackPlugins = []
  let htmls = glob.sync('./src/*.html')
  for (var i = 0; i < htmls.length; i++) {
    // console.log('[chunks[i]]:    ' + [chunks[i]], 'htmls[i]:    ' + htmls[i])
    let conf = {
      filename: chunks[i] + '.html', //生成的html存放路径，相对于path,例如pageA.html
      template: htmls[i], // html模板路径
      inject: 'body',
      chunks: [`${[chunks[i]]}`]
    }
    if (process.env.NODE_ENV === 'production') {
      conf.hash = true
    }
    HtmlWebpackPlugins.push(new HtmlWebpackPlugin(conf))
  }
  return HtmlWebpackPlugins
}

let htmlWebpackPlugin = getHtml()

module.exports = {
  // 入口配置
  entry: entries,
  output: {
    // 必须是绝对路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]_[chunkhash:8].js'
  },
  // 用来调试，生成map文件的，比如我打包到线上，不生成map，文件会小很多
  devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin() // 如果输出目录没有改动，默认清除dist目录内文件
  ].concat(htmlWebpackPlugin)
}
