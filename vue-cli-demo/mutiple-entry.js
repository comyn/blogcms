const path = require('path')
const glob = require('glob')

const generateEntries = () => {
  // 默认查询多页面地址
  const PATH_ENTRY = path.resolve(__dirname, './src/pages')
  // 约定构建出的页面用folder名字，默认入口为每个页面的main.js
  const entryFilePaths = glob.sync(PATH_ENTRY + '/**/main.js')
  const entry = {}

  entryFilePaths.forEach((filePath) => {
    const FILENAME = filePath.match(/([^/]+)\/main\.js$/)[1]

    entry[FILENAME] = {
      entry: filePath,
      template: 'public/index.html',
      filename: FILENAME === 'index' ? `${FILENAME}.html` : `${FILENAME}/${FILENAME}.html`,
      // title可不传，每个页面单独设置
      title: `${FILENAME} Page`,
      chunks: ['chunk-vendors', 'chunk-common', FILENAME]
    }
  })

  return entry
}

const generateDefaultEntry = () => {
  const entry = {}
  entry['index'] = {
    // page 的入口
    entry: 'src/main.js',
    // 模板来源
    template: 'public/index.html',
    // 在 dist/index.html 的输出
    filename: 'index.html',
    // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Index Page',
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', 'index']
  }
  return entry
}

module.exports = {
  generateDefaultEntry,
  generateEntries
}
