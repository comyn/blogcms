const db = require('../models/db')
const sqlHelper = require('../utilities/sqlhelper')
const moment = require('moment')

/**
 * 分页评论列表
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
    const sqlStr = `select * from comments where ${andConditionStr} limit ${start}, ${_limit}`

    const comments = await db.query(sqlStr)

    // 查询总条数 先数组结构再对象解构
    const [{ count }] = await db.query('select count(*) as count from comments')

    res.status(200).json({ code: 0, messages: 'success', data: { count, comments } })
  } catch (error) {
    next(error)
  }
}

/**
 * 获取单个评论
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.one = async (req, res, next) => {
  try {
    const { id } = req.params
    const sqlStr = `select * from comments where id =${id}`
    const comments = await db.query(sqlStr)
    res.status(200).json({ code: 0, message: 'success', data: comments[0] })
  } catch (error) {
    next(error)
  }
}

/**
 * 创建评论
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.create = async (req, res, next) => {
  try {
    const { content = '', topic_id: topicId, reply_id: replyId = 0 } = req.body

    const sqlStr = `insert into comments(content, topic_id, reply_id, user_id, create_time, update_time, is_delete) 
    values(
      '${content}',
      ${topicId},
      ${replyId},
      ${req.session.user.id},
      '${moment().format('YYYY-MM-DD hh:mm:ss')}',
      '${moment().format('YYYY-MM-DD hh:mm:ss')}',
      ${0}
    )`
    console.log(sqlStr)
    const result = await db.query(sqlStr)
    const topics = await db.query(`select * from comments where id = ${result.insertId}`)
    res.status(201).json(topics[0])
  } catch (error) {
    next(error)
  }
}

/**
 * 更新评论
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

    let sqlStr = 'update comments set '
    sqlStr += body.content ? `content = '${body.content}'` : ''
    sqlStr += body.topic_id ? `, topic_id = ${body.topic_id}` : ''
    sqlStr += body.reply_id ? `, reply_id = ${body.reply_id}` : ''
    sqlStr += body.user_id ? `, user_id = ${body.user_id}` : ''
    sqlStr += `, update_time = '${body.update_time}'`
    sqlStr += body.is_delete ? `, is_delete = ${body.is_delete}` : ''
    sqlStr += ` where id = ${id}`

    // 执行更新操作
    await db.query(sqlStr)

    const [updatedTopic] = await db.query(`
        select * from comments where id = ${id}
    `)
    res.status(201).json(updatedTopic)
  } catch (error) {
    next(error)
  }
}

/**
 * 删除评论
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.destroy = async (req, res, next) => {
  try {
    // 执行删除操作
    await db.query(`
        delete from comments where id = ${req.params.id}
    `)

    // 响应成功
    res.status(204).json({})
  } catch (err) {
    next(err)
  }
}
