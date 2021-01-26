var fs = require('fs')
var http = require('http')

http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.write('nihao 世界')
    fs.readdir('c:/disk/VSCode', function (err, files) { 
        files.forEach( function (file){
            console.log( file )
        });
    })
    res.end()
})
    .listen('3000', function (err, data) {
      if (err) {
          console.log(err)
        }
        console.log('server running 3000');
    })