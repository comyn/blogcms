const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		app: './src/js/index.js',
		another: './src/js/another-module.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CleanWebpackPlugin(), // 如果输出目录没有改动，默认清除dist目录内文件
		new HtmlWebpackPlugin({ title: 'webpack 入门实战' }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common' // 指定公共 bundle 的名称。
		})
	]
}
