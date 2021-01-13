exports.andCondition = (query) => {
  let str = ' 1=1 '
  for (const key in query) {
    if (key === '_page' || key === '_limit') {
      continue
    }
    str += ` and ${key}='${query[key]}'`
  }
  return str
}
