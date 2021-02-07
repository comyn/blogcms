// webpack.config.js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口配置
  entry: {
    app: './src/main.js',
    one: './src/js/one.js',
    two: './src/js/two.js'
  },
  // 出口配置
  output: {
    // 必须是绝对路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  // 用来调试，生成map文件的，比如我打包到线上，不生成map，文件会小很多
  devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',
  plugins: [
    // 生成多个页面需要调用多次new HtmlWebpackPlugin() 多页面的配置
    new HtmlWebpackPlugin({
      // 生成多个页面,filename作为标识
      filename: 'index.html',
      // 多页面引入自己的js
      chunks: ['app'],
      // 自定义模板标题
      // 模板页title定义为 <%= htmlWebpackPlugin.options.title %>
      // 必须这么写htmlWebpackPlugin
      title: 'hello world',
      // 模板
      template: './src/index.html',
      inject: true,
      // 生成的文件消除缓存
      hash: true,
      // 压缩输出
      minify: {
        // 删除空白字符(折叠空白区域)
        collapseWhitespace: false
        // 删除属性的双引号
        // removeAttributeQuotes:true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'one.html',
      template: './src/one.html',
      inject: true,
      chunks: ['one'] // 只使用自己one.js
    }),
    new HtmlWebpackPlugin({
      filename: 'two.html',
      template: './src/two.html',
      inject: true,
      chunks: ['two'] // 只使用自己two.js
    }),
    new CleanWebpackPlugin() // 如果输出目录没有改动，默认清除dist目录内文件
  ]
}
