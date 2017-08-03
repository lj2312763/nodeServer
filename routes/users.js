var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var users = [];
var db = path.join(__dirname, '../db.json');
router.post('/login', function (req, res, next) {
    console.log(db);
    console.log('request……');
    var errcode = 0,
        message = '登录失败',
        _data = null;
    var userName = req.body.userName;
    var pwd = req.body.pwd;

    fs.readFile(db, {encoding: 'utf-8'}, function (err, bytesRead) {
        if (err) throw err;
        users = JSON.parse(bytesRead);
        //for (var i = 0, l = users.length; i < l; ++i) {
        //    var _userName = users[i].userName;
        //    var _pwd = users[i].pwd;
        //    if (userName === _userName && _pwd === pwd) {
        //        errcode = 1;
        //        message = '登录成功';
        //        _data = null;
        //        break
        //    }
        //}
        var user = users.find(function (item) {
            return item.userName === userName && item.pwd === pwd
        });
        if (user) {
            req.session.regenerate(function (error) {
                console.log('error', error);
                if (error) {

                    errcode = 0;
                    message = '登录失败';
                }
                req.session.loginUser = userName;
                errcode = 1;
                message = '登录成功';
                _data=user;
                console.log(req.session);
                //res.cookie('resc','设置到cookie里的值',{expires:new Date(Date.now()),httpOnly:true});
                res.send({errcode, message, data: _data});
                users = [];
                console.log("Login User Success!");
                next();
            })
        } else {
            errcode = 0;
            message = '登录失败';
            res.send({errcode, message, data: _data});
            users = [];
            console.log("Login User fail!");
        }

    });

});
router.post('/register', function (req, res, next) {
    console.log('request……');
    var userName = req.body.userName;
    var pwd = req.body.pwd;
    var errcode = 1,
        message = '注册成功',
        _data = null;
    fs.readFile(db, {encoding: 'utf-8'}, function (err, bytesRead) {
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
            fs.writeFile(db, JSON.stringify(users), function (err) {
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
