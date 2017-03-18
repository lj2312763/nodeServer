var express = require('express');
var router = express.Router();
var fs = require('fs');
var users = [];
router.post('/login', function (req, res, next) {
    console.log('request……');
    var errcode = 0,
        message = '登录失败',
        _data = null;
    var userName = req.body.userName;
    var pwd = req.body.pwd;
    fs.readFile('e:\\0.json', {encoding: 'utf-8'}, function (err, bytesRead) {
        if (err) throw err;
        users = JSON.parse(bytesRead);
        console.log('----------查找前', users);
        for (var i = 0, l = users.length; i < l; ++i) {
            var _userName = users[i].userName;
            var _pwd = users[i].pwd;
            if (userName === _userName && _pwd === pwd) {
                errcode = 1;
                message = '登录成功';
                _data = null;
                break
            }
        }
        res.send({errcode, message, data: _data});
        users = [];
        console.log("Login User Success!");
        next();
    });

});
router.post('/register', function (req, res, next) {
    console.log('request……');
    var userName = req.body.userName;
    var pwd = req.body.pwd;
    var errcode = 1,
        message = '注册成功',
        _data = null;
    fs.readFile('e:\\0.json', {encoding: 'utf-8'}, function (err, bytesRead) {
        if (err) throw err;
        users = JSON.parse(bytesRead);
        console.log('----------修改前', users);
        for (var i = 0, l = users.length; i < l; ++i) {
            var _userName = users[i].userName;
            if (userName === _userName) {
                errcode = 0;
                message = '用户名重复';
                _data = null;
                break
            }
        }
        if (errcode === 1) {
            users.push({userName, pwd});
            fs.writeFile('e:\\0.json', JSON.stringify(users), function (err) {
                if (err) throw err;
                res.send({errcode, message, data: _data});
                users = [];
                console.log("Register User Success!");
            });
        } else {
            res.send({errcode, message, data: _data});
        }

        //fs.readFile('e:\\0.json', {encoding: 'utf-8'}, function (err, bytesRead) {
        //    if (err) throw err;
        //    console.log('----------修改后', JSON.parse(bytesRead));
        //});

    });

});
module.exports = router;
