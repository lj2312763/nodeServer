/**
 * Created by Administrator on 2017/3/11.
 */
import { combineReducers } from 'redux'
import ReactRouterRedux, { routerReducer as routing } from 'react-router-redux'
import login from './login/reducers.js'
import home from './home/message.reducer'
const initialState = {};
export default combineReducers({
    login,
    home,
    routing
}, initialState)
