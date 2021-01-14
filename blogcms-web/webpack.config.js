const path = require('path')

module.exports = { 
  mode: 'development', // 指定环境: "production" | "development" | "none"
  entry: { 
    bundle:'./src/js/index.js' // 需要打包的文件
  },
  output: {
    filename: '[name].[chunkhash:8].js', // 输入的文件名是什么, 生成的文件名也是什么
    path: path.resolve(__dirname, './dist') // 指定生成的文件目录
  }
}
