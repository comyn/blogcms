// webpack.config.js, 同一个目录下加载多个html和js，HtmlWebpackPlugin 多个，html只会加载自己的js文件
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口配置
  entry: { index: './src/js/index.js', one: './src/js/one.js', two: './src/js/two.js' }, // 出口配置
  output: {
    // 必须是绝对路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]_[chunkhash:8].js'
  },
  // 用来调试，生成map文件的，比如我打包到线上，不生成map，文件会小很多
  devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //生成的html存放路径，相对于path
      template: './src/index.html', // 项目进行中我们自己存放的html模板路径
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'one.html', //生成的html存放路径，相对于path
      template: './src/one.html', // 项目进行中我们自己存放的html模板路径
      chunks: ['one']
    }),
    new HtmlWebpackPlugin({
      filename: 'two.html', //生成的html存放路径，相对于path
      template: './src/two.html', // 项目进行中我们自己存放的html模板路径
      chunks: ['two']
    }),
    new CleanWebpackPlugin() // 如果输出目录没有改动，默认清除dist目录内文件
  ]
}
