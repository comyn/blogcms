// hbs模板引擎使用

// 加载数据模块
const blogEngine = require('../blog')

// routes/hbs.js
module.exports = function (app) {
  app.get('/home', function (req, res) {
    res.render('index', { title: '最近文章', entries: blogEngine.getBlogEntries() })
  })

  app.get('/about', function (req, res) {
    res.render('about', { title: '自我介绍' })
  })

  app.get('/article/:id', function (req, res) {
    const entry = blogEngine.getBlogEntry(parseInt(req.params.id))
    res.render('article', { title: entry.title, blog: entry })
  })
}
