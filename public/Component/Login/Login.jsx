/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/14 14:46
 * desc:
 *  */
import React,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as loginActions from '../../redux/login/actions.js'
import './login.css'
//
//@connect(
//    (state)=> ({
//        state: state
//    }), (dispatch)=> ({
//        actions: bindActionCreators(loginActions, dispatch)
//    }))
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
    }

    //登录事件
    _login = (e)=> {
        let {loginIn}=this.props.actions;
        let userName = this.refs.username.value;
        let pwd = this.refs.pwd.value;
        loginIn(userName,pwd);
    }

    render() {
        return (
            <div>
                <div className='loginBox'>
                    <label for="" >用户名：</label><input type="text" ref='username'/>
                    <label for="">密码：</label><input type="password"  ref='pwd'/>
                    <button onClick={e=>{this._login(e)}}>登录</button>
                    <button>重置</button>
                </div>
            </div>
        )
    }

}
export default connect(
    (state)=> ({
        state: state
    }), (dispatch)=> ({
        actions: bindActionCreators(loginActions, dispatch)
    }))(Login)