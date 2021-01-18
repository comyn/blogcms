const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = { 
  mode: 'development', // 指定环境: "production" | "development" | "none"
  entry: { 
    bundle:'./src/js/index.js' // 需要打包的文件
  },
  output: {
    filename: '[name].js', // 输入的文件名是什么, 生成的文件名也是什么,或[name].[chunkhash:8].js
    path: path.resolve(__dirname, './dist') // 指定生成的文件目录
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      { test:/\.css$/, use:['style-loader', 'css-loader'] }, // 必须先style-loader,再css-loader
      { test:/\.(png|svg|jpg|gif)$/, use: ['file-loader']} // 加载文件
    ]
  }
}
