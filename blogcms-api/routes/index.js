// routes/index.js

module.exports = function (app) {
  // app.get('/tt', (req, res) => {
  //   res.send('hello world')
  // })

  app.get('/hello/:who', function (req, res) {
    res.end('Hello, ' + req.params.who + '.')
  })

  app.get('/hello/:who?', function (req, res) {
    if (req.params.id) {
      res.end('Hello, ' + req.params.who + '.')
    } else {
      res.send('Hello, Guest.')
    }
  })

  // app.get('/forum/:fid/thread/:tid', middleware)

  // 匹配/commits/71dbb9c
  // 或/commits/71dbb9c..4c084f9这样的git格式的网址
  app.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function (req, res) {
    const from = req.params[0]
    const to = req.params[1] || 'HEAD'
    res.send('commit range ' + from + '..' + to)
  })

  app.get('/test', (req, response) => {
    response.redirect('/hello/anime')
    response.redirect('http://www.example.com')
    response.redirect(301, 'http://www.example.com')
    response.sendFile('/path/to/anime.mp4')
    response.render('index', { message: 'Hello World' }) // index.html 模板引擎
  })
}
