// Express 提供了一种更好的方式
// 专门用来包装路由的
const express = require('express')

// 1. 创建一个路由容器
const router = express.Router()

// 2. 把路由都挂载到 router 路由容器中

router.get('/test1', function (req, res) {
  res.send('Hello world')
})
router.get('/customer1', function (req, res) {
  res.send('customer page')
})
router.get('/admin1', function (req, res) {
  res.send('admin page')
})
