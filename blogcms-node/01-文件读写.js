// var str = "Hello world";
// console.log(str);

var fs = require("fs")

fs.readFile("./01.js", function (error, data) {
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
})
  
fs.writeFile("./02.md", "我是内容", function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("写入成功")
    }
})
