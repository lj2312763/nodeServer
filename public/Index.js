/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/9 11:34
 * desc:
 *  */
import React,{Component} from 'react'
import reactDOM ,{render} from 'react-dom'
import Redux, { createStore, applyMiddleware, combineReducers } from 'redux'
import ReactRouter,{ browserHistory  } from 'react-router-dom'
import ReactRouterRedux,{ syncHistoryWithStore, routerReducer as routing  } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import ReactRedux,{Provider,connect} from 'react-redux'

import Routes from './routes/index.js'
//import BasicExample from './BasicExample.js'

//导入redux的总入口
import reducers from './redux/index.js'
////创建store
//let store = createStore(reducers);
////

const createStoreWithMiddleware = applyMiddleware(
    ReduxThunk
)(createStore);
//console.log("---------", reducers);
//const store = createStore(
//    combineReducers({
//        ...reducers,
//        routing
//    })
//);
const store = createStoreWithMiddleware(reducers);
console.log('---------store', store);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        )
    }
}

render(<App />, document.getElementById('root'));