const path = require('path')

module.exports = {
  mode: "development", // "production" | "development" | "none"
  // 这里应用程序开始执行
  // webpack 开始打包
  entry: './js/main.js', // string | object | array
  output: { // webpack 如何输出结果的相关选项
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    path: path.resolve(__dirname, 'dist'), // string
    filename:'bundle.js' // string
  }
}