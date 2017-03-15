/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/9 11:32
 * desc:
 *  */

var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var port = pkg.config.port;
var host = pkg.config.host;
var DEBUG = process.env.NODE_ENV === 'development';
var webpackCopePlugin=require('copy-webpack-plugin');

var entry={
    index: [
        './Index.js'
    ]
};
if(DEBUG){
   entry.index.push( `webpack-dev-server/client?http://${host}:${port}`, 'webpack/hot/dev-server')
}
module.exports = {
    devtool: DEBUG?'cheap-module-inline-source-map':false,
    entry: entry,
    output: {
        path: path.resolve(pkg.config.buildDir),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({//此插件可以直接使变量全局使用，单必须要配置resolve
            $: 'jquery',
            ajax: 'ajax'
        }),
        new webpackCopePlugin([
            {from:'images',to:'images'}
        ])
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
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(pkg.config.buildDir),//本地服务器所加载的页面所在的目录
        hot: true,//模块替换
        noInfo: false,
        open: true,//自动打开主页
        inline: true,//实时刷新
        stats: {colors: true},//终端中输出结果为彩色
        host: host,//代理服务器地址
        port: port,//代理服务器端口
        proxy: {'/api/*': {target: pkg.config.devProxy, secure: false}}
    },
    resolve: {
        alias: {
            jquery: path.join(__dirname + '/node_modules/jquery'),
            ajax: path.join(__dirname + '/ajax.js')
        },
        extensions: ['', '.js', 'jsx', '.json']
    },
    externals: {
        $: 'jquery'
    }
};