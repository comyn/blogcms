// app.js文件
const express = require('express')
const path = require('path')
const routes = require('./routes')
const hbsroutes = require('./routes/hbs')
// const router = require('./router')
// 加载hbs模块
const hbs = require('hbs')
const bodyParser = require('body-parser')

// 加载数据模块

const app = express()
const port = 3000

// 设定port变量，意为访问端口
// app.set('port', process.env.PORT || 3000)

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'))

// 设定view engine变量，意为网页模板引擎, 指定模板文件的后缀名为jade(html)
app.set('view engine', 'html')

// 运行hbs模块
app.engine('html', hbs.__express)

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// app.use(express.favicon())
// app.use(express.logger('dev'))
// app.use(express.bodyParser())
// app.use(express.methodOverride())
// app.use(app.router)

// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问
// 网址则显示为http://localhost:3000/images
// app.use(express.static(path.join(__dirname, 'public')))
app.use('/static', express.static(path.join(__dirname, './public')))

// 所有路由都会经过该中间件,可以用于检验是否登录或者是否具有权限
app.all('*', function (request, response, next) {
  // response.writeHead(200, { 'Content-Type': 'text/plain' }) // 需要引入http,express是http的封装,不需要再引入
  next()
})

// 路由方式1
routes(app)
hbsroutes(app)
// 路由方式2, 把路由容器挂载到 app 服务中,推荐
// app.use(router)

// ******************
// #region 原生无路由 start
// ******************
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.patch('/user', function (req, res) {
  res.send('Got a PATCH request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
// ******************
// #endregion 原生无路由 end
// *************

app.get('/api', (req, res, next) => {
  try {
    throw new Error('没有该接口')
  } catch (error) {
    next(error)
  }
})

// 页面或接口没找到404 NOT FOUND
app.get('*', function (request, response) {
  response.end('404!')
})

// 服务器异常500错误
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!' + err.message)
  // res.status(500).json({
  //   error: err.message
  // })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Please visit http://127.0.0.1:${port}`)
})
