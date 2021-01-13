
const path = require('path')

// 卸载文件nw-uninstall.js
const Service = require('node-windows').Service

const svc = new Service({
  name: 'node windows server test', // 名称
  description: 'The socket.io nodejs server test ', // 描述
  script: path.resolve('./app.js'), // node执行入口
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
})

svc.on('uninstall', function () {
  console.log('Uninstall complete.')
  console.log('The service exists: ', svc.exists)
})

svc.uninstall()
