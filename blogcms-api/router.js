// Express 提供了一种更好的方式
// 专门用来包装路由的
const express = require('express')
const db = require('./models/db')
const sqlHelper = require('./utilities/sqlhelper')

// 1. 创建一个路由容器
const router = express.Router()

// 2. 把路由都挂载到 router 路由容器中

router.get('/users', async (req, res, next) => {
  try {
    // res.send('1111')
    // res.status(200).json({ code: 0, message: '成功' })
    const andConditionStr = sqlHelper.andCondition(req.query)
    const sqlStr = `select * from users where ${andConditionStr}`
    res.status(200).json(await db.query(sqlStr))
  } catch (error) {
    next(error)
  }
}).post('/users', (req, res, next) => {

}).patch('/users', (req, res, next) => {

}).delete('/users', (req, res, next) => {

})

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
