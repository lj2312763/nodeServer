/**
 * Created by Administrator on 2017/8/3.
 */
/**
 * 字符串校验工具
 */
export const validator = {
    reg: function (str, options) { //字符校验,带配置项入口
        options = options || {};
        if (str) {
            for (let name in options) {
                let result;
                if (this[name]) {
                    result = this[name](str, options[name]);
                }
                if (result) {
                    return result
                }
            }
        }
    },
    specialCharacter: function (str, param) { //特殊字符校验
        let nameReg = new RegExp("^[`~!@#$^&*()=|{}'\":;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？_].*");
        let quotationOut = /\\/g;
        //JIan Li 2017-1-23 首字符不能为特殊字符和数字，只能为字母和中文
        let firstNotNum = new RegExp("^[a-zA-Z\u4e00-\u9fa5].*"); //首位非数字
        if (quotationOut.test(str) || nameReg.test(str) || !firstNotNum.test(str)) {
            return param
        }
    },
    stringTooShort: function (str, param) { //字符过短
        if (str && str.length < param.len) {
            return param
        }
    },
    stringTooLong: function (str, param) { //字符过长
        if (str && str.length > param.len) {
            return param
        }
    },
    stringStartWithSpace: function (str, param) { //首字符为空格
        if (str.substr(0, 1) == " ") {
            return param
        }
    },
    stringHaveSpace: function (str, param) { //字符拥有空格
        if (str.indexOf(" ") >= 0) {
            return param
        }
    }
}

/**
 * 文本处理函数
 * @param src 需要处理的文本
 * @param length 需要显示的文本的长度
 * @param tail 后边根着的字符串
 */
export const ellipsis = (src, byteLength, tail) => {
    if (!src) {
        return src
    }
    let s = '',
        tailToUse = tail || '...';
    for (let i = 0; i < src.length && byteLength > 0; i++) {
        s += src.charAt(i);
        let charCode = src.charCodeAt(i);
        if ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 128) || (charCode > 95 && charCode < 106))
            byteLength -= 1;
        else
            byteLength -= 2;
    }
    if (tailToUse != null && byteLength <= 0) {
        byteLength = tailToUse.length;
        for (let i = s.length - 1; i >= 0 && byteLength > 0; i--) {
            let charCode = s.charCodeAt(i);
            if (charCode > 0 && charCode < 128)
                byteLength -= 1;
            else
                byteLength -= 2;
            s = s.substring(0, i);
        }
        return s + tailToUse;
    } else {
        return s;
    }
}


export const zoo = (gen, val) => {
    return new Promise((resolve, reject) => {
        var g = gen(val);
        function core(g, val) {
            let r = g.next(val);
            if (r.done) {
                resolve(val);
            } else {
                r.value.then(val => {
                    core(g, val);
                }).catch(val => {
                    console.log("init catch are", val);
                    reject(val);
                })
            }
        }
        core(g, val);
    })
}
/**
 *  转为流量单位，并保留一位小数
 *
 */
export const transformliuliang = num => {
    num = parseFloat(num);
    var mblist = [
        { key: "K", value: 1000 },
        { key: "M", value: 1000000 },
        { key: "B", value: 1000000000 },
        { key: "T", value: 1000000000000 }
    ]
    if (num > 9999.9) {
        let rtv;
        mblist.forEach( (item,index) => {
            let r = num / item.value;
            if (r >= 1 && (r < 1000 || index === 3) && !rtv) {
                rtv = {
                    val: r.toFixed(2),
                    key: item.key
                }
            }
        })
        return `${rtv.val}${rtv.key}`
    }else{
        return num;
    }
}

/* 修改人：覃刚  修改时间：2016/10/14 修改问题：  问题描述：统计数据偏大显示换行。*/
/**
 * 数字文本处理函数
 * @param src 需要处理的文本
 * @param length 需要显示的文本的长度
 */
export const ellipsisNum = (text, len) => {
    if (!text) {
        return text
    }
    let s = '',
        tailToUse = '...';
    s = text.substring(0, len) + tailToUse;
    return s
}

/**
 * 日期处理函数
 * @param obj 需要处理的日期
 * @param text 你需要进行作为标准的分割点
 * @returns {*} 返回处理之后的文本
 * @constructor
 */
export const DateFormat = (obj, text) => {
    text === undefined && (text = ' ')
    return obj ?
        obj.split(text)[0] :
        obj
}

export const clone = (obj) => {
    return _clone(obj);
}

export const qianfenweitrim = _s => {
    let reg1 = /\B(?=(\d{3})+$)/gi;
    let reg2 = /\B(?=(\d{3})+\D)/gi;
    let s = _s + "";
    try {
        if (reg2.test(s)) {
            return s.replace(reg2, ",")
        } else if (reg1.test(s)) {
            return s.replace(reg1, ",")
        }
        return _s === Infinity ? 0 : _s;
    } catch (e) {
        return _s === Infinity ? 0 : _s;
    }
}
export const setTRENDREALHEIGHT = (num, num2 = 0) => {
    let wh = window.screen.height,
        ww = window.screen.width;
    if (wh === 768) {
        num = 350 + num2;
    }
    return num;
}
//递归查找当前入参节点
export const findNode = (node, currentId) => {
    return _findNode(node, currentId);
}

const _findNode = (node, currentId) => {
    if (node.temp == currentId) {
        return node;
    }
    if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
            let temp = _findNode(node.children[i], currentId);
            if (temp) {
                return temp;
            };
        }
    }
}

/**
 * 计算百分比
 * */
export const percentage = (num, total) => {
    return (Math.round(num / total * 10000) / 100.00 + "%"); // 小数点后两位百分比
}

export const makeUID = () => {
    let count = 0, numcount = 0;
    let uid = []
    while (count < 6) {
        uid.push(String.fromCharCode(97 + Math.random() * 26))
        count++;
    }
    while (numcount < 6) {
        uid.push(parseInt(Math.random() * 10));
        numcount++;
    }
    return uid.join('');
}
/**
 * 计算百分比
 * @param num 要转换的值
 * @param dot 保留的小数的位数
 * */
export const percentageNumber = (num, dot = 0) => {
    dot = Math.pow(10, dot);
    let temp = Math.round(num * 100 * dot) / (dot);
    if (temp === Infinity)
        return temp;
    if (isNaN(temp))
        return 0;
    return `${temp}%`
}

/**
 * 删除数组中的某个值
 * @arr obj 要删除的数组
 * @val 删除数组值
 * */
export const removeByValue = (arr, val) => {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
    return arr;
}
/**
 * 克隆一个对象
 * @param obj 要克隆的对象
 * @return 克隆好的对象
 * */
const _clone = (obj) => {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj)
        return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0; i < obj.length; ++i) {
            copy[i] = _clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = _clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

/**
 * 获取浏览器信息
 * */
export const getBrowserInfo = () => {
    var Sys = {};
    var ua = navigator
        .userAgent
        .toLowerCase();
    var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
    var m = ua.match(re);
    Sys.browser = m[1].replace(/version/, "'safari");
    Sys.ver = m[2];
    return Sys;
}

export const myBrowser = () => {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

/**
 * 获取元素在浏览器中的绝对位置
 * @param element 需要获取位置的元素
 * @author:杜凌波
 * @增加方法目的：修改检视问题，smallFlow图的定位
 * */
export const getAbsPosition = (element) => {
    var abs = {
        x: 0,
        y: 0
    }
    var osType = myBrowser();
    //如果浏览器兼容此方法
    if (document.documentElement.getBoundingClientRect) {
        //注意，getBoundingClientRect()是jQuery对象的方法 如果不用jQuery对象，可以使用else分支。
        abs.x = element
            .getBoundingClientRect()
            .left;
        abs.y = element
            .getBoundingClientRect()
            .top;

        let screenLeft = osType === "Chrome" ?
                window.screenLeft :
                window.screenX,
            screenTop = osType === "Chrome" ?
                window.screenTop :
                window.screenY;

        abs.x += screenLeft + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        abs.y += screenTop + document.documentElement.scrollTop - document.documentElement. //如果浏览器不兼容此方法
                clientTop;

    } else {
        while (element != document.body) {
            abs.x += element.offsetLeft;
            abs.y += element.offsetTop;
            element = element.offsetParent;
        }

        //计算相对位置
        abs.x += window.screenLeft + document.body.clientLeft - document.body.scrollLeft;
        abs.y += window.screenTop + document.body.clientTop - document.body.scrollTop;

    }

    return abs;
}

//将文字首字母大写，其他小写
export const firstUpcase = (words) => {
    if (!words) {
        return words;
    }
    let newWords = words.toLowerCase();
    return newWords.replace(/\b(\w)|\s(\w)/g, function (m) {
        return m.toUpperCase();
    });
};

export const clean = (target) => {
    return _clean(target)
}

const _clean = (target) => {
    for (let name in target) {
        let value = target[name];
        if (value === null || value === undefined || value === '' || (value !== true && value !== false && !isNumeric(value) && isEmptyObject(value)) || (isArray(value) && value.length == 0)) {
            delete target[name]
        } else if (isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                isPlainObject(value[i]) && _clean(value[i])
            }
        } else if (isPlainObject(value)) {
            _clean(value)
        }
    }
    return target;
}

/**
 * 元素resize事件
 * copy from github element-resize-event
 * */
var resizeEvent = function resizeEvent(element, fn) {
    //@zmz 6-1 判断element是否为undefined
    if (!element) {
        return false;
    }
    var window = this
    var document = window.document
    var isIE
    var requestFrame

    var attachEvent = document.attachEvent
    if (typeof navigator !== 'undefined') {
        isIE = navigator
                .userAgent
                .match(/Trident/) || navigator
                .userAgent
                .match(/Edge/)
    }

    requestFrame = (function () {
        var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function fallbackRAF(func) {
                return window.setTimeout(func, 20)
            }
        return function requestFrameFunction(func) {
            return raf(func)
        }
    })()

    var cancelFrame = (function () {
        var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout
        return function cancelFrameFunction(id) {
            return cancel(id)
        }
    })()

    function resizeListener(e) {
        var win = e.target || e.srcElement
        if (win.__resizeRAF__) {
            cancelFrame(win.__resizeRAF__)
        }
        win.__resizeRAF__ = requestFrame(function () {
            var trigger = win.__resizeTrigger__
            if (trigger !== undefined) {
                trigger
                    .__resizeListeners__
                    .forEach(function (fn) {
                        fn.call(trigger, e)
                    })
            }
        })
    }

    function objectLoad() {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
        this
            .contentDocument
            .defaultView
            .addEventListener('resize', resizeListener)
    }

    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = []
        if (attachEvent) {
            element.__resizeTrigger__ = element
            element.attachEvent('onresize', resizeListener)
        } else {
            if (getComputedStyle(element).position === 'static') {
                element.style.position = 'relative'
            }
            var obj = element.__resizeTrigger__ = document.createElement('object')
            obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; ' +
                'overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;')
            obj.setAttribute('class', 'resize-sensor')
            obj.__resizeElement__ = element
            obj.onload = objectLoad
            obj.type = 'text/html'
            if (isIE) {
                element.appendChild(obj)
            }
            obj.data = 'about:blank'
            if (!isIE) {
                element.appendChild(obj)
            }
        }
    }
    element
        .__resizeListeners__
        .push(fn)
}

resizeEvent.unbind = function (element, fn) {
    var attachEvent = document.attachEvent;
    element
        .__resizeListeners__
        .splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
        if (attachEvent) {
            element.detachEvent('onresize', resizeListener);
        } else {
            element
                .__resizeTrigger__
                .contentDocument
                .defaultView
                .removeEventListener('resize', resizeListener);
            element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
        }
    }
}

export const isEqualToObj = (x, y) => {
    return _isEqualToObj(x, y);
}

/**
 * 比较两个对象是否相等
 * */
const _isEqualToObj = (x, y) => {
    // If both x and y are null or undefined and exactly the same
    if (x === y) {
        return true;
    }

    // If they are not strictly equal, they both need to be Objects
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }

    // They must have the exact same prototype chain, the closest we can do is test
    // the constructor.
    if (x.constructor !== y.constructor) {
        return false;
    }

    for (var p in x) {
        // Inherited properties were tested using x.constructor === y.constructor
        if (x.hasOwnProperty(p)) {
            // Allows comparing x[ p ] and y[ p ] when set to undefined
            if (!y.hasOwnProperty(p)) {
                return false;
            }

            // If they have the same strict value or identity then they are equal
            if (x[p] === y[p]) {
                continue;
            }

            // Numbers, Strings, Functions, Booleans must be strictly equal
            if (typeof (x[p]) !== "object") {
                return false;
            }

            // Objects and Arrays must be tested recursively
            if (!_isEqualToObj(x[p], y[p])) {
                return false;
            }
        }
    }

    for (p in y) {
        // allows x[ p ] to be set to undefined
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
            return false;
        }
    }
    return true;
};

/**
 * 计算角度
 * @param x 所求角的邻直角边长度
 * @param y 所求角的对直角边长度
 * */
export const getAngle = (x, y) => {
    return {
        angleDeg: 180 / (Math.PI / Math.atan2(y, x)), //人类理解的角度,给transform使用
        angle: Math.atan2(y, x) //计算用角度
    }
}
/**
 * 排序算法
 * name 为比较的字段名
 * type 为当前的排序标记，false为从大到小排序，true为从小到大排序
 */
export const sortFunction = (name, type) => {
    return function (o, p) {
        var a,
            b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            if (!isNaN(Number(o[name]))) {
                a = Number(o[name]);
            } else {
                a = o[name];
            }
            if (!isNaN(Number(p[name]))) {
                b = Number(p[name]);
            } else {
                b = p[name];
            }

            if (a === b) {
                return 0;
            }
            if (type) {
                if (typeof a === typeof b) {
                    return a > b ?
                        -1 :
                        1;
                }
                return typeof a > typeof b ?
                    -1 :
                    1;
            } else {
                if (typeof a === typeof b) {
                    return a < b ?
                        -1 :
                        1;
                }
                return typeof a < typeof b ?
                    -1 :
                    1;
            }

        } else {
            throw ("error");
        }
    }
}
/**
 * [将含有'='字符串转化为对象]
 * @param chooseFilter 后台返回filter字符串
 */
export const transformObj = (chooseFilter) => {
    if (!chooseFilter) {
        return
    }
    let arr = chooseFilter
        .toString()
        .split(','),
        keyArr = [], //储存键值
        valueArr = []; //将key value组成对象保存
    //将filter字符串转化为数组
    arr.map(function (item, i) {
        keyArr.push(item.split('='));
    });
    //将数组拼装成对象保存
    keyArr.map(function (item, i) {
        valueArr.push({
            key: item[0],
            value: item[1]
        });
    });
    return valueArr;
}

/**
 * 找到当前分析模型下一层
 * @param  {[type]} originalAnalysis [原始分析模型]
 * @param  {[type]} id               [正在使用分析模型Id]
 */
export const findDrillAnalysis = (originalAnalysis, id) => {
    return _findDrillAnalysis(originalAnalysis, id);
}
const _findDrillAnalysis = (originalAnalysis, id) => {
    if (originalAnalysis.fixedId == id) {
        return originalAnalysis.analysisDrill
    } else {
        if (originalAnalysis.analysisDrill && originalAnalysis.analysisDrill.analysisInfos) {
            let currentUseAnalysis = originalAnalysis.analysisDrill.analysisInfos,
                analysis;
            currentUseAnalysis.forEach((item) => {
                if (item.fixedId == id) {
                    analysis = item.analysisDrill || '';
                } else {
                    analysis = _findDrillAnalysis(item, id);
                }
            });
            return analysis;
        } else {
            console.error('找不到下一层下钻分析模型');
            return
        }
    }
}

/**
 * 当前filter中是否含有下钻filter，如果返回true，则说明已存在改filter条件
 * @param  {[type]} filter [当前filter]
 * @param  {[type]} dirllFilter     [下钻dirllFilter]
 */
export const ifHaveThisFilter = (filter, dirllFilter) => {
    return _ifHaveThisFilter(filter, dirllFilter);
}
const _ifHaveThisFilter = (filter, dirllFilter) => {
    if (filter.fixedId == dirllFilter.fixedId) {
        if (phoneNum(filter.value) != phoneNum(dirllFilter.value)) { //如果当前filter value值不等于 下钻filrr，则是点击另外一个子类
            return {
                isOtherFilter: true,
                hasThisFilter: true
            };
        } else {
            return {
                isOtherFilter: false,
                hasThisFilter: true
            };
        }
    }
    if (filter.next) {
        return ifHaveThisFilter(filter.next, dirllFilter);
    }
    return {
        isOtherFilter: false,
        hasThisFilter: false
    };
}

/**
 * 删除当前分析模型中已添加filter
 * @param  {[type]} currentAnalysis [原始模型中当前分析模型]
 * @return {[fixedId]} [传过来的filter ID]
 */
export const deleteExistFilter = (currentAnalysis, fixedId) => {
    return _deleteExistFilter(currentAnalysis, fixedId);
}

const _deleteExistFilter = (currentAnalysis, fixedId) => {
    if (currentAnalysis.analysisInfos) {
        currentAnalysis
            .analysisInfos
            .forEach((item) => {
                if (item.filter) {
                    if (item.filter.fixedId == fixedId) {
                        delete item.filter;
                    } else {
                        deleteFilter(item.filter, fixedId);
                    }
                }
                if (item.analysisDrill) {
                    //@wangchuan 如果当前分析模型有下钻层，那么直接删除下钻层所有过滤条件
                    item
                        .analysisDrill
                        .analysisInfos
                        .forEach((ele) => {
                            if (ele.filter) {
                                delete ele.filter;
                            }
                        });
                    // _deleteExistFilter(item.analysisDrill, fixedId);
                }
            });
    }
}

/**
 * 删除当前分析模型中的设置的过滤条件
 * 返回上一级切换下钻数据时需要清除已经添加的设置的过滤条件
 * @param currentAnalysis 为当前的分析模型
 * @param fixedId 为当前分析模型的ID
 *
 */
export const deleteSettingFilter = (currentAnalysis) => {
    return _deleteSettingFilter(currentAnalysis)
}
const _deleteSettingFilter = (currentAnalysis) => {
    currentAnalysis
        .analysisInfos
        .forEach((item) => {
            // 删除粒子中的设置过滤条件
            item
                .particle
                .fields
                .forEach((elem) => {
                    if (elem.vars) {
                        delete elem.vars
                    }
                });
            // 删除汇总中的设置过滤条件
            item
                .summary
                .results[0]
                .fields
                .forEach((elem) => {
                    if (elem.vars) {
                        delete elem.vars
                    }
                });
            // 遍历下层的数据
            if (item.analysisDrill) {
                _deleteSettingFilter(item.analysisDrill);
            }
        })
}

export const deleteFilter = (filter, fixedId) => {
    return _deletFilter(filter, fixedId)
}
const _deletFilter = (filter, fixedId) => {
    if (!filter.next) {
        return;
    }
    if (filter.next && filter.next.fixedId == fixedId) {
        delete filter.next;
    } else {
        _deletFilter(filter.next, fixedId);
    }
}

/**
 * 找到当前分析模型上一层
 * @param  {[type]} originalAnalysis [原始分析模型]
 * @param  {[type]} id               [正在使用分析模型Id]
 */
export const findCurrentPrevAnalysis = (originalAnalysis, id) => {
    return _findCurrentPrevAnalysis(originalAnalysis, id);
}
const _findCurrentPrevAnalysis = (originalAnalysis, id) => {
    if (originalAnalysis.analysisDrill && originalAnalysis.analysisDrill.analysisInfos) {
        let currentUseAnalysis = originalAnalysis.analysisDrill.analysisInfos,
            analysis,
            otherAnalysis;
        currentUseAnalysis.forEach((item) => {
            if (item.fixedId == id) {
                analysis = originalAnalysis;
            } else {
                analysis = _findCurrentPrevAnalysis(item, id);
            }
        });
        return analysis;
    } else {
        console.error('找不到上一层');
        return
    }
}

/**
 * 在原始entity中找到当前分析模型，并替换成当前分析模型
 * @param  {[type]} originalEntity  [原始entity]
 * @param  {[type]} currentAnalysis [当前分析模型]
 */
export const findCurrentAnalysisInOriginaEntity = (originalEntity, currentAnalysis) => {
    _findCurrentAnalysisInOriginaEntity(originalEntity, currentAnalysis);
}
const _findCurrentAnalysisInOriginaEntity = (originalEntity, currentAnalysis) => {
    let analysis = originalEntity.analysises || originalEntity.analysisInfos;
    analysis.forEach((item, index) => {
        if (item.fixedId == currentAnalysis.fixedId) {
            analysis[index] = currentAnalysis;
        } else {
            if (item.analysisDrill) {
                findCurrentAnalysisInOriginaEntity(item.analysisDrill, currentAnalysis);
            }
        }
    })
}
/**
 * 根据传过来id 找到当前节点使用的分析模型中
 * @param  {[string]} entity  [当前节点]
 * @param  {[string]} fixedId [当前分析模型id]
 * @return {[type]}         [description]
 */
let obj = {};
export const findCurrentAnalysis = (entity, fixedId, type = 'analysis') => {
    return _findCurrentAnalysis(entity, fixedId, type);
}
const _findCurrentAnalysis = (entity, fixedId, type) => {
    let analysises = entity.analysises || entity.analysisInfos;
    if (analysises) {
        for (let i = 0; i < analysises.length; i++) {
            if (analysises[i].fixedId == fixedId) {
                if (type == 'drill') {
                    obj.currentAnalysis = entity;
                } else {
                    obj.currentAnalysis = analysises[i];
                }
                obj.index = i;
                break;
            }
            if (analysises[i].analysisDrill) {
                obj = _findCurrentAnalysis(analysises[i].analysisDrill, fixedId, type);
            }
        }
        return obj;
    } else {
        console.error('未找到当前分析模型');
        return
    }
}
/**
 * 社交圈数据转换
 * 社交圈的数据格式需要运用到d3图形的绘制，
 * 因此需要转换成特定的数据格式
 * 模型的格式如下：
 {
    children: arr,//数组（可能没有）
    currentValue: number,//当前的统计数值
    depth:number,//层级数值
    id:str,//字符串
    parent:{},// 上一层的数据（第一层没有）
    maxDepth:number,//层级总数
    name:str,//字符串
    value:number,// 总和的统计数值
}
 */
export const SocialCircleData = (data) => {
    let {
            currentData,
            parentData,
            filterValue,
            particleData
            } = data,
        currentValue = 2, // 展开的数据的value（排名）
        currentFilter = 1, // 展开的数据的value（排名）
        currentName = 0, // 展开数据的名称（电话号码）
        totalValue = 0, // 统计总数
        maxDepth = 3; // 最大层级

    // 计算出统计的总和
    parentData.forEach(i => {
        totalValue += Number(i.value);
    })

    // 中心统计数据
    let coreData = {
        currentValue: totalValue,
        name: particleData.type,
        value: particleData.value,
        maxDepth,
        id: particleData.name
    }

    // 高中低三类数据
    let dataIndex = 0;
    let classData = parentData.map((item, i) => {
        if (item.filterValue === filterValue) {
            dataIndex = i;
        }
        let obj = {
            currentValue: Number(item.value),
            name: item.name,
            value: totalValue,
            classIndex: i,
            filterValue: item.filterValue
        }
        return obj
    })

    // 展开的数据
    let spreadData = currentData.map((item, index) => {
        let obj = {
            currentValue: Number(item[currentValue]),
            name: item[currentName],
            value: totalValue,
            filterValue: item[currentFilter]
        }
        return obj
    })

    // 合并数据 展开数据放入分类数据中
    classData[dataIndex].children = spreadData;
    // 通过判断是否有children来从新排列高中低三个分类的位置
    classData.sort((a, b) => {
        return (a.children ?
                (a.children.length || 0) :
                0) - (b.children ?
                (b.children.length || 0) :
                0)
    })

    // 分类的值放进统计总数的children
    coreData.children = classData;

    return coreData
}

/**
 * 电话号码处理
 * 电话号码需要返回给后端查询数据，原隐藏的数字需要加密
 * 前端需要区分展示数据和提交数据
 * 后端返回的电话号码结构如下：
 * 130****9999TEL999TEL
 * */
export const phoneNum = (str) => {
    if (!str) {
        return str
    }
    // 前端显示隐匿的号码，提交所有的数据
    if (str.toString().indexOf("TEL") >= 0) {
        return str
            .toString()
            .split("TEL")[0]
    } else {
        // 如果不包含TEL，返回原字符串
        return str
    }
}

/**
 * 找到filter中最后一个含有next的对象
 */
export const findLastFilterNext = (filter) => {
    return filter ?
        _findLastFilterNext(filter) :
        undefined;
}
const _findLastFilterNext = (filter) => {
    if (filter.next) {
        if (filter.next.next) {
            return findLastFilterNext(filter.next.next);
        } else {
            return filter.next;
        }
    } else {
        return filter;
    }
}
//找到对应value
export const findValue = (obj, keyValue) => {
    if (!obj) {
        return
    }
    if (!obj.value) {
        return
    }
    return _findValue(obj, keyValue);
}
const _findValue = (obj, keyValue) => {
    if (obj.value.toString().indexOf(keyValue.key) > 0) {
        //替换'{$和}'中间的内容
        obj.value = i18n.replaceEval(obj.value, (code, src) => {
            if (keyValue.key == code) {
                return keyValue.value
            } else {
                return code;
            }
        });
    }
    if (obj.next) {
        _findValue(obj.next, keyValue);
    }
    return obj;
}
/**
 * 查找是否有相同的filter
 */
export const findSameFilter = (filter, fixedId) => {
    return _findSameFilter(filter, fixedId)
}
const _findSameFilter = (filter, fixedId) => {
    if (filter.next) {
        if (filter.fixedId === fixedId) {
            return true
        }
        findSameFilter(filter.next, fixedId);
    } else {
        if (filter.fixedId === fixedId) {
            return true
        }
        return false
    }
}

/**
 * 查找当前分析模型下的自定义事件对象
 * @param  {Array}events：自定义事件对象数组
 * @param {String}eventGoal：自定义事件触发对象的表示
 * @returns {Array} 找到的结果
 */
export const findCurrentEventObj = (events, eventGoal) => {
    return events.filter((item) => {
        if (item.eventGoal === eventGoal && item.eventName) {
            return item
        }
    });
}

export const elementResizeEvent = (typeof window === 'undefined') ? resizeEvent : resizeEvent.bind(window)
//修改人:杜凌波。修改时间：2016-10-7，修改问题：DE-1062，问题描述：见问题单描述
export const colors = [
    '#379cf8',
    '#a3e06a',
    '#f9b32a',
    '#c4a9f8',
    '#83e5e5',
    '#f288bc',
    '#ff8f83',
    "#bbbbbb",
    '#fdba00',
    '#57c01e',
    '#fc5043'
];
//全局注册事件;
export const DEEM = {
    evList: {},
    register: function (type, fn, evir) {
        evir = evir ? evir : null;
        var obj = {
            callback: fn,
            evir: evir
        }
        // if (this.evList[type]) {
        //     this.evList[type].push(obj)
        // } else {
        //     this.evList[type] = [obj]
        // }
        this.evList[type] = [obj]
    },
    fire: function (evir) {
        var that = this;
        var evir = evir ? evir : null;
        return function () {
            var argumentss = [].slice.call(arguments, 1),
                type = arguments[0];
            that.evList[type] && that.evList[type].forEach(function (item, index) {
                var _evir = evir ? evir : item.evir;
                item.callback.apply(_evir, argumentss)
            })
        }
    }
}

// 委托 jQuery 的工具类
export const isEmptyObject = $.isEmptyObject
export const isPlainObject = $.isPlainObject
export const isFunction = $.isFunction
export const isArray = $.isArray
export const isNumeric = $.isNumeric
export const trim = $.trim
export const extend = $.extend
export const has = (element, selector) => $(element).has(selector)
export const css = (element, name, value) => value === undefined ? $(element).css(name) : (element).css(name, value)
export const text = (element, value) => value === undefined ? $(element).text() : $(element).text(value)
export const offset = (element) => $(element).offset()
export const height = (element, value) => value === undefined ? $(element).height() : $(element).height(value)
export const width = (element, value) => value === undefined ? $(element).width() : $(element).width(value)
export const scrollTop = (element, value) => value === undefined ? $(element).scrollTop() : $(element).scrollTop(value)
export const scrollLeft = (element, value) => $(element).scrollLeft(value)
export const bind = (element, types, data, fn) => $(element).bind(types, data, fn)
export const unbind = (element, types, fn) => $(element).unbind(types, fn)