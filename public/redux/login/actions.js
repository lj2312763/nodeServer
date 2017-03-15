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
export function loginIn (userName,pwd) {
    let data={
        userName,pwd
    };
    let url='api/login';
    return (dispatch)=> {
        return ajax.post('api/login').send({userName: userName, pwd: pwd}).exchange(function (err, res) {
            dispatch({type:'login',data:res.body.data});
        })
    }
}
export function loginOut () {
    return (dispatch)=> {
        return ajax.get('api/login').query({userName: 'lijian', pwd: '123'}).exchange(function (err, res) {
            dispatch({type:'login',data:res.body.data});
        })
    }
}