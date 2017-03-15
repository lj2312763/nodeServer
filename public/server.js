/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/6 17:39
 * desc:
 *  */
!process.env.NODE_ENV && (process.env.NODE_ENV = 'development');
var webpack = require('webpack');
//导入热替换服务依赖包
var WebpackDevServer = require('webpack-dev-server');
//导入webpack配置文件
var config = require('./webpack.config');
var pag = require('./package.json');
var port = pag.config.port;
var host = pag.config.host;
var path = require('path');
//创建服务器
var server = new WebpackDevServer(
    webpack(config),
    //服务器信息配置
    config.devServer
);


//port代表监听端口，host代表的本地服务器的地址，
server.listen(port, host, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('========================================');
        console.log(`===output.path:---->${path.resolve(pag.config.buildDir)}`);
        console.log(`===> ?Open up http://${host}:${port}/`);
        console.log('=======================================');
    }

});