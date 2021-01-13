const md5 = require('blueimp-md5')
const db = require('../models/db')

/**
 * 获取会话状态
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.get = (req, res, next) => {
  const { user } = req.session
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

/**
 * 登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.create = async (req, res, next) => {
  try {
    const body = req.body
    body.password = md5(md5(body.password))
    const sqlStr = `select * from users where username='${body.username}' and password = '${body.password}'`
    const [user] = await db.query(sqlStr)

    if (!user) {
      return res.status(404).json({ error: 'Invalid username or password!' })
    }

    // 登录成功, 记录 Session
    req.session.user = user

    // 发送响应
    res.status(201).json({ code: 0, message: 'Login success.', data: user })
  } catch (error) {
    next(error)
  }
}

/**
 * 注销登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.desotry = (req, res, next) => {
  try {
    delete req.session.user
    res.status(201).json({ code: 0, message: 'Login out success', data: {} })
  } catch (error) {
    next(error)
  }
}
