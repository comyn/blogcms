const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // 模式配置 development/production
  mode: 'development',
  // 入口文件
  entry: {
    app: './src/js/index.js',
    another: './src/js/another-module.js'
  },
  // 出口文件
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 模块相关配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // 加载图片
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8k的图片自动转成base64格式
              name: 'images/[name].[ext]?[hash]', // 图片打包后存放的目录
              publicPath: '../' // css图片引用地址，可修正打包后，css图片引用出错的问题
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 加载字体文件
        use: ['file-loader']
      },
      {
        test: /\.css$/, // extract-text-webpack-plugin：拆分单独的css
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.css$/, // 添加css3前缀
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.js$/, // 转义es6
        loader: 'babel-loader',
        exclude: /node_modules/ // 忽略掉该文件下的js
      }
    ]
  },
  // 插件相关配置
  plugins: [
    new CleanWebpackPlugin(), // 如果输出目录没有改动，默认清除dist目录内文件
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
        removeAttributeQuotes: true // 移除双引号，
      },
      hash: true, //向html引入的src链接后面增加一段hash值,消除缓存
      template: './src/index.html', // 模板地址
      title: 'webpack' // 标题
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // 指定公共 bundle 的名称。
    })
  ],
  // 解析模块的可选项
  resolve: {
    alias: {
      components: './src/components/', // resolve.alias 配置别名 原来import Dialog from './src/components/dialog'可以缩减为import Dialog from 'components/dialog';
      extensions: ['.js', '.json'], // 自动解析扩展，意味着我们导入模块可以省略不写后缀名
      modules: ['./src/components', 'node_modules'] // 配置 Webpack 去哪些目录下寻找第三方模块
    }
  },
  // 开发服务器相关配置
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 服务器资源的根目录，不写的话，默认为bundle.js
    compress: true, // 服务器资源采用gzip压缩
    port: 9000, // 运行的端口
    overlay: true, // 出错代码是否显示在html页面上
    hot: true //热加载
  },
  //开发工具，比如启动source-map
  devtool: 'inline-source-map'
}
