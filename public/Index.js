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

//导入redux的总入口
import reducers from './redux/reducers.js'
//创建store
let store = createStore(reducers);
//

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    //props类型
    static propTypes = {};
    //props的默认值
    static defaultProps = {};

    componentWillMount() {
        let _this = this;
        //ajax({
        //    type: 'get',
        //    url: '/api/w',
        //    success: function (req) {
        //        if (req.errcode === 1) {
        //            _this.setState({text: req.data})
        //        }
        //        console.log(req);
        //    }
        //})
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Login />
                </div>
            </Provider>
        )
    }
}

render(<App />, document.getElementById('root'));