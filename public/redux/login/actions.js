/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/14 14:36
 * desc:
 *  */

/**
 *
 * @param {String}userName:用户名
 * @param {String}pwd
 * @returns {Function}
 */
export function loginIn(userName, pwd) {
    let data = {
        userName, pwd
    };
    let url = 'api/users/login';
    return (dispatch)=> {
        return ajax.post(url).send({userName: userName, pwd: pwd}).exchange(function (err, res) {
            sessionStorage.setItem('session',JSON.stringify(res.body.data));
            dispatch({type: 'login', data: res.body.data,loginStatus:true});
        })
    }
}
export function loginOut() {
    return (dispatch)=> {
        return ajax.get('api/users/loginOut').exchange(function (err, res) {
            dispatch({type: 'loginOut', data: res.body,loginStatus:false});
        })
    }
}
export function register(name, pwd) {
    return (dispatch)=> {
        return ajax.post('api/users/register').query({userName: name, pwd: pwd}).exchange(function (err, res) {
            dispatch({type: 'register', data: res.body.data});
        })
    }
}

/**
 * 修改登录状态
 * @param status
 * @returns {Function}
 */
export function modify(status) {
    return (dispatch)=> {
        dispatch({type: 'modifyLogin',status});
    }
}