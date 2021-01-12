exports.andCondition = (query) => {
  let str = ' 1=1 '
  for (const key in query) {
    str += ` and ${key}='${query[key]}'`
  }
  return str
}
