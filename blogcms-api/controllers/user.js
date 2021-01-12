const db = require('../models/db')
const sqlHelper = require('../utilities/sqlhelper')

exports.list = async function (req, res, next) {
  try {
    console.log(req.query)
    const andConditionStr = sqlHelper.andCondition(req.query)
    const sqlStr = `select * from users where ${andConditionStr}`
    res.status(200).json(await db.query(sqlStr))
  } catch (error) {
    next(error)
  }
}
