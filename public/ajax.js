/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/14 15:49
 * desc:重构ajax请求
 *  */
let token = $("meta[name='_csrf']").attr("content") || 'test',
    header = $("meta[name='_csrf_header']").attr("content") || 'test1',
    settings = {
        before: (url, callback) => callback(url),
        complete: (err, res, callback) => callback(err, res)
    };
import { browserHistory, hashHistory } from "react-router-dom"
let ajax = {
    set: function(key, value) {
        !this.options.headers && (this.options.headers = {});
        this.options.headers[key] =value;
        return this;
    },
    type: function(type) {
        this.options.type = type;
        return this;
    },
    query: function(params) {
        this.options.data = params;
        this.options.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        return this;
    },
    send: function(params, isupload) {
        if(isupload){
            this.options.contentType = false;
            this.options.processData = false;
        }else{
            params = JSON.stringify(params);
            this.options.contentType = 'application/json; charset=UTF-8'
        }
        this.options.data = params;
        return this;
    },
    end: function(callback) {
        this.set(header, token);
        var req = $.extend(this.options, {
            complete: function(jqXHR) {
                let { responseJSON: body, status, statusText, responseText: text } = jqXHR;
                //拼接header
                let header = jqXHR.getAllResponseHeaders()
                    .trim()
                    .split("\n")
                    .map( item => item.split(/:\s/))
                    .reduce( (one, two) => {
                        one[two[0]] = two[1];
                        return one;
                    }, {});
                let ok = status === 200 ? true : false;
                // try{
                //     body = JSON.parse(body);
                // }catch(e){
                //     console.log(e);
                //     console.error("解析JSON 失败")
                // }
                let isShowLoadding = this.isShowLoadding;
                let res = {
                    isShowLoadding,
                    body,
                    ok,
                    statusText,
                    status,
                    text,
                    header,
                    statusCode: status
                };
                settings.complete(null, res, callback);
            }
        });
        $.ajax(req);
    },
    success: function(callback) {
        return this.end((err, res) => {
            let headerInfo = res.header['Content-Type'] || res.header['content-type'];
            if(res.status == '500' || !res.ok){
                if(window.language_flag){
                    alert(i18n.message('SERVER.NOT.CONNECT'));
                }else{
                    alert(res.text);
                }
                return false;
            }
            if (headerInfo.indexOf('text/html') > -1) { //页面过期处理
                alert(i18n.message('ERROR.MESSAGE.TIMEOUT'));
                sessionStorage.removeItem("userRoles");
                (_platform != 'SEP') && hashHistory.push('/login');
                return false;
            }
            if (!(err || !res.ok)) {
                callback(err, res);
            } else {
                if (!err.crossDomain) { //有三种可能性错误，1.timeout 2.abort 3.others  在第三种情况时取消提示
                    alert(err.message + (res && res.error && res.error.message ? ': ' + res.error.message : ''))
                }
            }
        });
    },
    exchange: function(callback) {
        return this.success((err, res) => {
            if (res.body && res.body.errcode) {
                callback(err, res);
            } else if (res.body) {
                alert(res.body.message);
            } else {
                alert('请求错误');
            }
        });
    }
}

export const setup = (options) => Object.assign(settings, options);

const request = (type, url, isShowLoadding = true) => settings.before(url,() => Object.assign({}, ajax, { options: { type, url, isShowLoadding, dataType: 'json' } }),isShowLoadding);

export const head = (url) => request('head', url);
export const get = (url, isShowLoadding) => request('get', url, isShowLoadding);
export const post = (url) => request('post', url);

