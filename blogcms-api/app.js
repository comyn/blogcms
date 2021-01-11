const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res, next) => {
  res.send('hello world')
})

app.get('/api', (req, res, next) => {
  try {
    throw new Error('没有该接口')
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Please visit http://127.0.0.1:${port}`)
})
