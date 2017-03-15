/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/9 11:34
 * desc:
 *  */
import React,{Component} from 'react'
import reactDOM ,{render} from 'react-dom'
import Redux, { createStore, applyMiddleware, combineReducers } from 'redux'
import ReactRouter ,{hashHistory }from 'react-router'
import ReactRouterRedux,{syncHistoryWithStore} from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import ReactRedux,{Provider,connect} from 'react-redux'
import Login from './Component/Login/Login.jsx'

import Routes from './routes/index.js'

//导入redux的总入口
import reducers from './redux/index.js'
////创建store
//let store = createStore(reducers);
////

const createStoreWithMiddleware = applyMiddleware(
    ReduxThunk
)(createStore);

const store = createStoreWithMiddleware(reducers);

// 路由的历史纪录（会写入到浏览器的历史纪录）
const history = syncHistoryWithStore(hashHistory, store);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Routes  history={history}/>
                </div>

            </Provider>
        )
    }
}

render(<App />, document.getElementById('root'));