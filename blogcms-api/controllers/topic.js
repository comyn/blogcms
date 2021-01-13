const db = require('../models/db')
const sqlHelper = require('../utilities/sqlhelper')
const moment = require('moment')

/**
 * 分页blog列表
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
    const sqlStr = `select * from topics where ${andConditionStr} limit ${start}, ${_limit}`

    const topics = await db.query(sqlStr)

    // 查询总条数 先数组结构再对象解构
    const [{ count }] = await db.query('select count(*) as count from topics')

    res.status(200).json({ code: 0, messages: 'success', data: { count, topics } })
  } catch (error) {
    next(error)
  }
}

/**
 * 获取单个blog
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.one = async (req, res, next) => {
  try {
    const { id } = req.params
    const sqlStr = `select * from topics where id =${id}`
    const topics = await db.query(sqlStr)
    res.status(200).json({ code: 0, message: 'success', data: topics[0] })
  } catch (error) {
    next(error)
  }
}

/**
 * 创建blog
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.create = async (req, res, next) => {
  try {
    const body = req.body
    body.create_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.update_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.user_id = req.session.user.id
    body.is_delete = 0

    const sqlStr = `insert into topics(title, content, author, create_time, update_time, is_delete) 
    values(
      '${body.title}',
      '${body.content ? body.content : ''}',
      ${body.user_id},
      '${body.create_time}',
      '${body.update_time}',
      ${body.is_delete}
    )`
    const result = await db.query(sqlStr)
    const topics = await db.query(`select * from topics where id = ${result.insertId}`)
    res.status(201).json(topics[0])
  } catch (error) {
    next(error)
  }
}

/**
 * 更新blog
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

    let sqlStr = 'update topics set '
    sqlStr += body.title ? `title = '${body.title}'` : ''
    sqlStr += body.content ? `, content = '${body.content}'` : ''
    sqlStr += body.author ? `, author = '${body.author}'` : ''
    sqlStr += `, update_time = '${body.update_time}'`
    sqlStr += body.is_delete ? `, is_delete = ${body.is_delete}` : ''
    sqlStr += ` where id = ${id}`

    // 执行更新操作
    await db.query(sqlStr)

    const [updatedTopic] = await db.query(`
        select * from topics where id = ${id}
    `)
    res.status(201).json(updatedTopic)
  } catch (error) {
    next(error)
  }
}

/**
 * 删除blog
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.destroy = async (req, res, next) => {
  try {
    // 执行删除操作
    await db.query(`
        delete from topics where id = ${req.params.id}
    `)

    // 响应成功
    res.status(204).json({})
  } catch (err) {
    next(err)
  }
}
