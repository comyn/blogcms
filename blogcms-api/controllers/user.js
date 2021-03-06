const db = require('../models/db')
const sqlHelper = require('../utilities/sqlhelper')
const moment = require('moment')
const md5 = require('blueimp-md5')

/**
 * 分页用户列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.list = async function (req, res, next) {
  try {
    // 对象解构赋值起别名的写法
    // let {_page: pageNo, _limit: pageSize} = {
    //     _page: 1,
    //     _limit: 10
    // }
    console.log(req.query)
    // 对象解构赋值的默认值写法
    let { _page = 1, _limit = 20 } = req.query
    if (_page < 1) {
      _page = 1
    }
    if (_limit < 1) {
      _limit = 1
    }
    if (_limit > 20) {
      _limit = 20
    }

    // 分页处理开始的索引
    /**
     * index _page _limit   数据下标        数据起始下标
     * 0      1      20       0~19            0
     * 1      2      20       20~39           20
     * 2      3      20       30~59           30
     * 3      4      20       60~89           60
     *                                  (_page - 1) * _limit
     */
    const start = (parseInt(_page) - 1) * _limit

    const andConditionStr = sqlHelper.andCondition(req.query)
    const sqlStr = `select * from users where ${andConditionStr} limit ${start}, ${_limit}`

    const users = await db.query(sqlStr)

    // 查询总条数 先数组结构再对象解构
    const [{ count }] = await db.query('select count(*) as count from users')

    res.status(200).json({ code: 0, messages: 'success', data: { count, users } })
  } catch (error) {
    next(error)
  }
}

/**
 * 获取单个用户
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.one = async (req, res, next) => {
  try {
    const { id } = req.params
    const sqlStr = `select * from users where id =${id}`
    const users = await db.query(sqlStr)
    if (users.length > 0) {
      res.status(200).json({ code: 0, message: 'success', data: users[0] })
    } else {
      res.status(404).json({ code: 1, message: 'User not found', data: null })
    }
  } catch (error) {
    next(error)
  }
}

/**
 * 创建用户
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.create = async (req, res, next) => {
  try {
    const body = req.body
    body.create_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.update_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.is_delete = 0

    const sqlStr = `insert into users(username, nickname, realname, password, telephone, email, address, avatar, gender, birth, remark, status, create_time, update_time, is_delete) 
    values(
      '${body.username}',
      '${body.nickname ? body.nickname : body.username}',
      '${body.realname ? body.realname : ''}',
      '${md5(md5(body.password))}',
      '${body.telephone ? body.telephone : ''}',
      '${body.email ? body.email : ''}',
      '${body.address ? body.address : ''}',
      'default-avatar.png',
      ${body.gender ? body.gender : 1},
      ${body.birth ? body.birth : null},
      '${body.remark ? body.remark : ''}',
      ${body.status ? body.status : 1},
      '${body.create_time}',
      '${body.update_time}',
      ${body.is_delete}
    )`
    const result = await db.query(sqlStr)
    const users = await db.query(`select * from users where id = ${result.insertId}`)
    res.status(201).json(users[0])
  } catch (error) {
    next(error)
  }
}

/**
 * 更新用户
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.update = async (req, res, next) => {
  try {
    // 获取路径参数
    const { id } = req.params
    // 获取表单数据
    const body = req.body
    body.update_time = moment().format('YYYY-MM-DD hh:mm:ss')

    let sqlStr = 'update users set '
    sqlStr += body.username ? `username = '${body.username}'` : ''
    sqlStr += body.nickname ? `, nickname = '${body.nickname}'` : ''
    sqlStr += body.realname ? `, realname = '${body.realname}'` : ''
    sqlStr += body.password ? `, password = '${md5(md5(body.password))}'` : ''
    sqlStr += body.telephone ? `, telephone = '${body.telephone}'` : ''
    sqlStr += body.email ? `, email = '${body.email}'` : ''
    sqlStr += body.address ? `, address = '${body.address}'` : ''
    sqlStr += body.avatar ? `, avatar = '${body.avatar}'` : ''
    sqlStr += body.gender ? `, gender = ${body.gender}` : ''
    sqlStr += body.birth ? `, birth = '${body.birth}'` : ''
    sqlStr += body.remark ? `, remark = '${body.remark}'` : ''
    sqlStr += body.status ? `, status = ${body.status}` : ''
    sqlStr += `, update_time = '${body.update_time}'`
    sqlStr += body.is_delete ? `, is_delete = ${body.is_delete}` : ''
    sqlStr += ` where id = ${id}`

    // 执行更新操作
    await db.query(sqlStr)

    const [updatedUser] = await db.query(`
        select * from users where id = ${id}
    `)
    res.status(201).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

/**
 * 删除用户
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.destroy = async (req, res, next) => {
  try {
    // 执行删除操作
    await db.query(`
        delete from users where id = ${req.params.id}
    `)

    // 响应成功
    res.status(204).json({})
  } catch (err) {
    next(err)
  }
}
