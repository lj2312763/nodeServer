var express = require('express');
var router = express.Router();

router.post('/api/login', function (req, res, next) {
    var result = {
        errcode: 1,
        data: '',
        message: ''
    };
    console.log('request……');
    if (req.body.userName === 'JianLi' && req.body.pwd === '123') {
        result = Object.assign({}, result, {message: "欢迎进入"});
    } else {
        result = Object.assign({}, result, {errcode: 0, message: "用户名或者密码错误"});
    }
    res.send(result);
    next();
});
module.exports = router;
