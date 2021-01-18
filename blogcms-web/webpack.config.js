const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
  mode: 'development', // 指定环境: "production" | "development" | "none"
  entry: { 
    // bundle:'./src/js/index.js' // 需要打包的文件
    app: './src/js/index.js',
    print: './src/js/print.js'
  },
  output: {
    // filename: '[name].js', // 输入的文件名是什么, 生成的文件名也是什么,或[name].[chunkhash:8].js
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist') // 指定生成的文件目录
  },
  devtool: 'inline-source-map', // 用于开发环境的时候，可以看到错误出现的位置，比如js打包前的错误位置，上产环境取消使用
  plugins: [
    new CleanWebpackPlugin(), // 如果输出目录没有改动，默认清除dist目录内文件
    new HtmlWebpackPlugin({ title: 'Output Management' })
  ],
  module: {
    rules: [
      { test:/\.css$/, use:['style-loader', 'css-loader'] }, // 必须先style-loader,再css-loader
      { test:/\.(png|svg|jpg|gif)$/, use: ['file-loader']}, // 加载文件
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit:50000,   //小于50K的 都打包
              // publicPath:"img/",	// 替换CSS引用的图片路径 可以替换成爱拍云上的路径
						  outputPath:"css/fonts/",		// 定义打包完成后最终导出的文件路径
              // useRelativePath:true,//设置为相对路径
              name: "[name].[hash:8].[ext]", // 文件的最终名称
            } 
          }
        ]
      }, // 加载字体文件 
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: ['url-loader']
      // },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }
    ]
  }
}
