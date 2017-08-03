/**
 * Created by Administrator on 2017/8/3.
 */
import * as types from './message.types'

let initState = {
    messageList: []
};

const home = (state = initState, action)=> {
    switch (action.type) {
        case types.MESSAGE_LIST:
        {

            console.log(action.data);
            return Object.assign({}, state, {messageList:action.data});
        }
        default:
            return state
    }
};
export default home