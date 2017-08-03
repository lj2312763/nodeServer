/**
 * Created by Administrator on 2017/8/3.
 */
import * as types from './message.types'

/**
 * 请求留言列表
 * @param obj
 * @returns {Function}
 */
export function queryMessageList(obj) {
    const URL = 'api/message/list';
    return (dispatch)=> {
        return ajax.post(URL).send(obj).exchange((err, res)=> {
            dispatch({type: types.MESSAGE_LIST, data: res.body.data});
        })
    }
}