/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/14 14:46
 * desc:
 *  */
import React,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Lifecycle } from 'react-router'
import * as loginActions from '../../redux/login/actions.js'
import './login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameErr: null,
            pwdErr: null,
        }
    }

    static defaultProps = {}
    static propTypes = {
        loginIn: React.PropTypes.func,
        register: React.PropTypes.func
    }

    componentDidUpdate() {
        console.log(111)
        //this.props.login.loginStatus&&(this.props.history.push('/home'))
    }

    componentWillMount() {
        //this.props.login.loginStatus&&(this.props.history.push('/home'))
    }



    //登录事件
    _login = (e)=> {
        console.log("登录")
        e.nativeEvent.stopImmediatePropagation();
        let {loginIn}=this.props.actions;
        let userName = this.refs.username.value;
        let pwd = this.refs.pwd.value;
        let nameErr = null,
            pwdErr = null;
        if (userName.trim() == '') {
            nameErr = '用户名不能为空';
        }
        if (pwd.trim() == '') {
            pwdErr = '密码不能为空';
        }
        if (pwdErr || nameErr) {
            this.setState({pwdErr, nameErr});
            return
        }
        loginIn(userName, pwd);
    };

    _register = (e)=> {
        console.log('注册')
        e.nativeEvent.stopImmediatePropagation();
        let userName = this.refs.username.value;
        let pwd = this.refs.pwd.value;
        let nameResult = this.VerificationUser(userName, 'name');
        let pwdResult = this.VerificationUser(pwd, 'pwd');
        let nameErr = null;
        let pwdErr = null;
        let {register}=this.props.actions;
        if (!nameResult.status || !pwdResult.status) {
            nameErr = nameResult.message;
            pwdErr = pwdResult.message;
            this.setState({nameErr, pwdErr});
        } else {
            register(userName, pwd)
        }
    };

    /**
     *
     * @param str
     * @param type
     * @constructor
     */
    VerificationUser = (str, type)=> {
        console.log('验证')
        let status = false,
            message = null;

        if (type === 'name') {
            if (str.trim().length > 0) {
                status = true;
            } else {
                message = '用户名不能为空'
            }
        }

        if (type === 'pwd') {
            if (str.trim().length > 0) {
                status = true;
            } else {
                message = '密码不能为空';
            }
        }

        return {status, message}
    }
    _reSet = (e)=> {
        console.log('重置')
        e.nativeEvent.stopImmediatePropagation();
        this.refs.username.value = '';
        this.refs.pwd.value = '';
        this.setState({nameErr: null, pwdErr: null});
    }

    _change = (type = 'name')=> {
        console.log('change')
        let nameErr = this.state.nameErr;
        let pwdErr = this.state.pwdErr;
        if (type === 'name') {
            nameErr = null;
        }
        if (type === 'pwd') {
            pwdErr = null;
        }
        this.setState({nameErr, pwdErr});
    }

    _onBlur = (type = 'name', value)=> {
        console.log('失焦')

        let nameErr = this.state.nameErr;
        let pwdErr = this.state.pwdErr;

        if (type === 'name') {
            nameErr = this.VerificationUser(value, type).message;
        }
        if (type === 'pwd') {
            pwdErr = this.VerificationUser(value, type).message;
        }
        this.setState({nameErr, pwdErr});
    }

    render() {
        let {nameErr,pwdErr}=this.state;
        console.log('www');
        return (
            <div className='loginbg'>
                {<img width='100%' className='loginimg' src="/images/15.jpg" alt=""/>}
                <div className='loginBox'>

                    <div className='login-row'>
                        <label for="username" className='login-label'>用户名：</label>
                        <input type="text" id='username' ref='username' className='login-input'
                               onKeyDown={e=>{e.keyCode===13&&this._login()}}
                               onChange={e=>{this._change('name')}}
                               onBlur={e=>{this._onBlur('name',e.target.value)}}
                            />
                        <span>{nameErr}</span>
                    </div>
                    <div className='login-row'>
                        <label for="pwd" className='login-label'>密码：</label>
                        <input type="password" id='pwd' ref='pwd' className='login-input'
                               onKeyDown={e=>{e.keyCode===13&&this._login(e)}}
                               onChange={e=>{this._change('pwd')}}
                               onBlur={e=>{this._onBlur('pwd',e.target.value)}}/>
                        <span>{pwdErr}</span>
                    </div>
                    <div className='login-btn-box'>
                        <span onClick={e=>{this._login(e)}} className='loginBtn'
                              onKeyDown={e=>{e.keyCode===13&&this._login(e)}}>登录</span>
                        <span className='loginBtn' onClick={e=>{this._reSet(e)}}>重置</span>
                        <span onClick={e=>{this._register(e)}} className='loginBtn'>注册</span>
                    </div>

                </div>
            </div>
        )
    }

}
export default connect(
    (state)=> ({
        login: state.login
    }), (dispatch)=> ({
        actions: bindActionCreators(loginActions, dispatch)
    }))(Login)