
var http = require("http")

var server = http.createServer()

server.on("request", function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    if (request.url === "/a") {
        response.write("请求的路径1:" + request.url, 'utf8')
        console.log("请求的ip地址和端口号:" + request.socket.remoteAddress + ":" + request.socket.remotePort)
    } else if(request.url==="/a/b"){
        response.write("请求的路径2:"+request.url,'utf8')
    } else {
        response.write("未知的的请求路径:"+request.url,'utf8')
    }
    console.log("客户端其你去了");
    response.end()
})
 
server.listen("3000",function() {
    console.log("服务器地址:http://127.0.0.1:3000 开启成功")
})

