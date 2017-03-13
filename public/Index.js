/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/9 11:34
 * desc:
 *  */
import React,{Component} from 'react'
import reactDOM ,{render} from 'react-dom'
import $ from 'jquery';
import Redux, { createStore, applyMiddleware, combineReducers } from 'redux'
import ReactRouter ,{hashHistory }from 'react-router'
import ReactRouterRedux,{syncHistoryWithStore} from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import ReactRedux,{Provider} from 'react-redux'

//导入redux的总入口
import reducers from './redux/index.js'

//导入路由
import Routers from './router/index.js'

/**
 * applyMiddleware来自redux可以包装store的dispatch；
 * createStore；来自redux，用于创建store
 */
const createeStoreMiddleware=applyMiddleware(
  ReduxThunk
)(createStore);

//创建store
const store =createeStoreMiddleware(reducers);

//路由的历史记录（会写入到浏览器的历史记录）
const histor=syncHistoryWithStore(hashHistory,store);





class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:''
        }
    }

    //props类型
    static propTypes = {};
    //props的默认值
    static defaultProps = {};

    componentWillMount() {
        let _this=this;
        $.ajax({
            type:'get',
            url:'/api/w',
            success:function(req){
                if(req.errcode===1){
                    _this.setState({text:req.data})
                }
                console.log(req);


            }
        })
    }

    render() {
        return (
            <div>{this.state.text }</div>
        )
    }
}

render(<Index /> ,document.getElementById('root'));