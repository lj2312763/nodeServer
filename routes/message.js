/**
 * Created by Administrator on 2017/7/31.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var message = path.join(__dirname, '../message.json');
router.post('/list', function (req, res, next) {
    fs.readFile(message, {encoding: 'utf-8'}, function (err, bytesRead) {
        if (err) throw err;
        try {

        } catch (err) {

        }
        var messageList = JSON.parse(bytesRead);
        res.send({errcode: 1, message: '', data: messageList});
    })


});
module.exports = router;
