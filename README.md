# nodeServer
使用node-express搭建的后台服务，结合前后端的初始结构

#说明：
以后后台代码直接称呼为后台，目录为项目更目录
前端代码统称前端，目录结构为public下所有文件


###使用supervsior 进程管理，后台代码改变不用重启后台服务器
要全局安装
npm install -g supervisor
###由于使用supervsior占用内存太大，现在直接更改为使用node的自己启动方案
"start": "node app.js"

###启动前端服务器
在public文件目录下打开命令行，使用npm install下载前端依赖插件，下载全程之后使用 npm start启动前端服务器
-如果下载过插件，直接使用npm start启动服务器

###启动后台服务器
在项目更目录下打开命令行，使用npm install 下载后台依赖插件，下载完成之后使用 npm start启动后台服务器
-如果下载过插件，直接使用npm start启动服务器

###后台服务器配置
在后台的package.json文件内的config属性下的host为服务器主机所在的ip地址，port为后台服务器的所在ip地址的端口

###前端服务器配置
在前端的package.json文件内config属性下host为前端主机所在的ip地址，port为端口，devProxy为要链接的后台地址格式必须为http://xxx.xxx.xxx.xxx:xxx
