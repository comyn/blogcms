# NodeJS 服务运行

[TOC]

## 1. 客户端启动 Node.js 应用

```sh
node app.js  # 方法一
npm start    # 方法二 Express框架
```

弊端: 客户端程序关闭, 服务引用随之关闭

## 2. 进程守护

Forever 可以守护 Node.js 应用，客户端断开的情况下，应用也能正常工作

### 2.1 安装

forever 要求安装到全局环境下

```shell
npm install forever -g
```

### 2.2 使用

`Linux下使用`

```shell
# 启动
forever start ./bin/www  ＃最简单的启动方式
forever start -l forever.log ./bin/www  #指定forever日志输出文件，默认路径~/.forever
forever start -l forever.log -a ./bin/www  #需要注意，如果第一次启动带日志输出文件，以后启动都需要加上 -a 参数，forever默认不覆盖原文件
forever start -o out.log -e err.log ./bin/www  ＃指定node.js应用的控制台输出文件和错误信息输出文件
forever start -w ./bin/www  #监听当前目录下文件改动，如有改动，立刻重启应用，不推荐的做法！如有日志文件，日志文件是频繁更改的
# 重启
forever restart ./bin/www ＃重启单个应用
forever restart [pid] #根据pid重启单个应用
forever restartall #重启所有应用

# 停止（和重启很类似）
forever stop ./bin/www ＃停止单个应用
forever stop [pid] #根据pid停止单个应用
forever stopall ＃停止所有应用

# 查看forever守护的应用列表
forever list
```

`Window server`

```

# 作为前台任务启动
forever server.js

# 作为服务进程启动
forever start app.js

#重启所有应用
forever restartall  

# 重启服务进程
forever restart Id

# 监视当前目录的文件变动，一有变动就重启
forever -w server.js

# -m 参数指定最多重启次数
forever -m 5 server.js

# 列出所有进程
forever list

#输出日志和错误
forever start -l forever.log -o out.log -e err.log app.js

# 指定forever信息输出文件，当然，默认它会放到~/.forever/forever.log
forever start -l forever.log app.js

# 指定app.js中的日志信息和错误日志输出文件，
# -o 就是console.log输出的信息，-e 就是console.error输出的信息
forever start -o out.log -e err.log app.js

# 追加日志，forever默认是不能覆盖上次的启动日志，
# 所以如果第二次启动不加-a，则会不让运行
forever start -l forever.log -a app.js

# 监听当前文件夹下的所有文件改动（不太建议这样）
forever start -w app.js

######停止操作

# 停止所有运行的node App
forever stopall

# 停止服务进程
forever stop Id

# 停止其中一个node App
forever stop app.js

# 开发环境下
NODE_ENV=development forever start -l forever.log -e err.log -a app.js
# 线上环境下
NODE_ENV=production forever start -l ~/.forever/forever.log -e ~/.forever/err.log -w -a app.js
#上面加上NODE_ENV为了让app.js辨认当前是什么环境用的
```

