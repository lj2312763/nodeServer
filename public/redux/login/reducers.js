/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/14 14:37
 * desc:用于测试redux的reducer，用来存储数据，数据变化，整个react组件重新刷新
 *  */
import * as types from './types.js'

//默认初始数据
let initState = {
    pathname: '/login',
    loginStatus: false,
};
const reducer = (state = initState, action = {})=> {

    switch (action.type) {
        case 'login':
        {
            return Object.assign({}, state, {
                //pathname:'/home',
                loginStatus: action.loginStatus,
                message: action.data.message
            })
        }
        case 'modifyLogin':
        {
            return Object.assign({}, state, {loginStatus: action.status})
        }
        default :
            return state
    }
};
export default  reducer