const express = require('express')
const path = require('path')

const app = express()
const port = 3000

// 向客户端公开目录,等价于 app.use(express.static(path.join(__dirname, './public'))) 或 app.use('/static', express.static(path.join(__dirname, './public')))
app.use('/static', express.static(path.join(__dirname, './public')))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.patch('/user', function (req, res) {
  res.send('Got a PATCH request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.get('/api', (req, res, next) => {
  try {
    throw new Error('没有该接口')
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!' + err.message)
  // res.status(500).json({
  //   error: err.message
  // })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Please visit http://127.0.0.1:${port}`)
})
