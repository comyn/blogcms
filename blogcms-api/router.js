// Express 提供了一种更好的方式
// 专门用来包装路由的
const express = require('express')
const userController = require('./controllers/user')
const db = require('./models/db')

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

// 1. 创建一个路由容器
const router = express.Router()

// 2. 把路由都挂载到 router 路由容器中

router
  .get('/users', userController.list)
  .post('/users', checkNoUser, userController.create)
  .patch('/users/:id', checkHasUser, userController.update)
  .delete('/users/:id', userController.destroy)

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
