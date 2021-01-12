const app = {
  name: 'app',
  version: '1.0.0',
  sayName: function (name) { // 不能是箭头函数
    console.log(this.name)
  }
}

// 导出对象
module.exports = app
