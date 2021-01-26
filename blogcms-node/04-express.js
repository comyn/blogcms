var express = require("express")

var app = express()

app.get('/', function (req, res) {
    // console.log('hello world1');
    res.send('Hello world')
})

app.use(express.static('public'))

app.listen(3000, function () {  
    console.log("express app is running...");
})