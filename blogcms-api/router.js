// Express 提供了一种更好的方式
// 专门用来包装路由的
const express = require('express')
const userController = require('./controllers/user')
const topicController = require('./controllers/topic')
const commentController = require('./controllers/comment')
const sessionController = require('./controllers/session')
const db = require('./models/db')

/**
 * 定义中间件 checkLogin, 这样需要验证的地方调用一下即可
 * 只有该中间件验证通过并调用 next, 才会走下一个中间件
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function checkLogin (req, res, next) {
  // 对象解构赋值
  const { user } = req.session

  if (!user) {
    // 状态码 401 表示要求用户进行身份验证
    return res.status(401).json({ err: 'Unauthorized' })
  }
  next()
}

async function checkNoUser (req, res, next) {
  try {
    const body = req.body
    const [user] = await db.query(`select * from users where username = '${body.username}'`)
    if (user) {
      return res.status(200).jso({ code: 1, message: 'User already exits.' })
    }
  } catch (error) {
    next(error)
  }
  next()
}

async function checkHasUser (req, res, next) {
  try {
    const { id } = req.params
    const [user] = await db.query(`select * from users where id = ${id}`)
    if (!user) {
      return res.status(404).json({ code: 1, message: 'User not found.' })
    }
  } catch (error) {
    next(error)
  }
  next()
}

async function checkTopic (req, res, next) {
  try {
    const { id } = req.params
    const [topic] = await db.query(`select * from topics where id = ${id}`)
    if (!topic) {
      return res.status(404).json({ code: 1, message: 'Topic not found.' })
    }
  } catch (error) {
    next(error)
  }
  next()
}

// 1. 创建一个路由容器
const router = express.Router()

// 2. 把路由都挂载到 router 路由容器中

/**
 * 用户
 */
router
  .get('/users', userController.list)
  .get('/users/:id', userController.one)
  .post('/users', checkLogin, checkNoUser, userController.create)
  .patch('/users/:id', checkLogin, checkHasUser, userController.update)
  .delete('/users/:id', checkLogin, checkHasUser, userController.destroy)

/**
 * blog资源
 */
router
  .get('/topics', topicController.list)
  .get('/topics/:id', checkTopic, topicController.one)
  // 同一个请求对应多个路由中间件
  .post('/topics', checkLogin, topicController.create)
  // 登录校验成功后, 接下来是blog相关的检验
  .patch('/topics/:id', checkLogin, checkTopic, topicController.update)
  .delete('/topics/:id', checkLogin, checkTopic, topicController.destroy)

/**
 * 评论资源
 */
router
  .get('/comments', commentController.list)
  .get('/comments/:id', commentController.one)
// 同一个请求对应多个路由中间件
  .post('/comments', checkLogin, commentController.create)
// 登录校验成功后, 接下来是blog相关的检验
  .patch('/comments/:id', checkLogin, commentController.update)
  .delete('/comments/:id', checkLogin, commentController.destroy)

/**
 * 会话管理
 */
router
  .get('/session', sessionController.get)
  .post('/session', sessionController.create)
  .delete('/session', sessionController.desotry)

router.get('/test1', function (req, res) {
  res.send('get test1')
}).post('/test1', (req, res) => {
  res.send('post test1')
}).put('/test1', (req, res) => {
  res.send('put test1')
}).patch('/test1', (req, res) => {
  res.send('patch test1')
}).delete('/test1', (req, res) => {
  res.send('delete test1')
})

router.get('/customer1', function (req, res) {
  res.send('customer page')
})

router.get('/admin1', function (req, res) {
  res.send('admin page')
})

module.exports = router
