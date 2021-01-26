const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	mode: 'production', // 指定环境: "production" | "development" | "none"
	entry: {
		bundle: './src/js/index.js', // 需要打包的文件
		// app: './src/js/index.js',
		// print: './src/js/print.js'
	},
	output: {
		// filename: '[name].js', // 输入的文件名是什么, 生成的文件名也是什么,或[name].[chunkhash:8].js
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './dist'), // 指定生成的文件目录
		publicPath: '/',
	},
	devtool: 'inline-source-map', // 用于开发环境的时候，可以看到错误出现的位置，比如js打包前的错误位置，上产环境取消使用
	devServer: {
		port: 8080, // 端口号,默认8080
		open: true, // 自动打开浏览器，默认为true
		contentBase: './dist', // 配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件
		hot: true, // 热更新，实时刷新本地服务
	},
	plugins: [
		new CleanWebpackPlugin(), // 如果输出目录没有改动，默认清除dist目录内文件
		new HtmlWebpackPlugin({ title: 'webpack 入门实战' }),
		// new webpack.NamedModulesPlugin(), // 热更新，最新版webpack已有，不需要单独添加
		new webpack.HotModuleReplacementPlugin(), // 热更新
	],
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 必须先style-loader,再css-loader
			{ test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }, // 加载文件
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 50000, //小于50K的 都打包
							// publicPath:"img/",	// 替换CSS引用的图片路径 可以替换成爱拍云上的路径
							outputPath: 'css/fonts/', // 定义打包完成后最终导出的文件路径
							// useRelativePath:true,//设置为相对路径
							name: '[name].[hash:8].[ext]', // 文件的最终名称
						},
					},
				],
			}, // 加载字体文件
			// {
			//   test: /\.(woff|woff2|eot|ttf|otf)$/,
			//   use: ['url-loader']
			// },
			{
				test: /\.(csv|tsv)$/,
				use: ['csv-loader'],
			},
			{
				test: /\.xml$/,
				use: ['xml-loader'],
			},
		],
	},
}
