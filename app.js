var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var message = require('./routes/message');
var pgk = require('./package.json');
var host = pgk.config.host;
var port = pgk.config.port;

var app = express();
//使用session
app.use(session({   /*打开session*/
    name:'uid',
    secret:"lijian",  /*设置session的加密字符串*/
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:10*1000//单位为毫秒
    }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//静态文件地址JavaScript、image、css……
app.use(express.static(path.join(__dirname, 'public')));

var count = 0;
//放在虚拟路径，在访问时要在端口后添加虚拟的路径
//app.use('/static', express.static('public'));

//路由设定
app.use('/', index);
app.use('/api/users', users);
app.use('/api/message', message);
//所有请求都会执行，不分get、post、put等等
app.use(function (req, res, next) {
    console.log('request start:' + new Date().toLocaleString());
    next();
});

app.use(function (req, res, next) {
    console.log('request end:' + new Date().toLocaleString());
});

// catch 404 and forward to error handler
//捕获404异常
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var server = app.listen(port, host, function () {
    //var host = server.address().address;
    //var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
module.exports = app;
