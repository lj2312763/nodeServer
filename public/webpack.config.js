/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/9 11:32
 * desc:
 *  */

var path = require('path');
var webpack = require('webpack');
var pkg=require('./package.json');
var port=pkg.config.port;
var host = pkg.config.host;

module.exports = {
    entry: {
        index: [
            './Index.js',
            `webpack-dev-server/client?http://${host}:${port}`,
            'webpack/hot/dev-server'
        ]
    },
    output: {
        path:path.resolve(pkg.config.buildDir),
        filename: 'bundle.js',
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/, //用babel编译jsx和es6
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                }
            }
        ]
    },
    devServer:{
        contentBase: path.resolve(pkg.config.buildDir),//本地服务器所加载的页面所在的目录
        hot: true,//模块替换
        noInfo: false,
        open:true,//自动打开主页
        inline: true,//实时刷新
        stats: {colors: true},//终端中输出结果为彩色
        host: host,//代理服务器地址
        port: port,//代理服务器端口
        proxy: { '/api/*': { target: pkg.config.devProxy, secure: false } }
    }
};