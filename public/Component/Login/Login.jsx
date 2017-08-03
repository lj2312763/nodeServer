/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/14 14:46
 * desc:
 *  */
import React,{Component,PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { hashHistory } from 'react-router'
import { withRouter } from 'react-router'
import * as loginActions from '../../redux/login/actions.js'
import './login.scss'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameErr: null,
            pwdErr: null
        }
    }

    static defaultProps = {}
    static propTypes = {
        loginIn: React.PropTypes.func,
        register: React.PropTypes.func
    }
    static contextTypes = {
        router: React.PropTypes.object,
    }

    componentDidUpdate() {
        this.props.login.loginStatus && (this.props.router.push('/home'))
    }

    componentDidMount() {
        this.context.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
    }

    componentWillMount() {
        //this.props.login.loginStatus&&(this.props.router.push('/home'))
    }

    routerWillLeave = (nextLocation)=> {
        console.log(nextLocation);
        return '确认要离开？';
    }

    //登录事件
    _login = (e)=> {
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

    //注册事件
    _register = (e)=> {
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
     * 验证用户名和密码方法
     * @param {String}str：用户名或密码的值
     * @param {String}type：输入框的类型
     * @constructor
     */
    VerificationUser = (str, type)=> {
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
    /**
     * 重置用户名和密码事件
     * @param {Object}e：事件对象
     * @private
     */
    _reSet = (e)=> {
        e.nativeEvent.stopImmediatePropagation();
        this.refs.username.value = '';
        this.refs.pwd.value = '';
        this.setState({nameErr: null, pwdErr: null});
    }
    /**
     * 用户名和密码输入框的change事件
     * @param {String}type：输入框的类型
     * @private
     */
    _change = (type = 'name')=> {
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

    /**
     * 用户名和密码输入框的失焦事件
     * @param {String}type：输入框的类型
     * @param {String}value：输入框的值
     * @private
     */
    _onBlur = (type = 'name', value)=> {
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
    /**
     *
     * @param {Object}e:事件对象
     * @private
     */
    _keyDown = (e)=> {
        e.nativeEvent.stopImmediatePropagation();
        if (e.keyCode === 13) {
            this._login(e);
        }
    }

    render() {
        let {nameErr,pwdErr}=this.state;
        return (
            <div className='loginbg'>
                {
                    /*
                     <img width='100%' className='loginimg' src="/images/15.jpg" alt=""/>
                     */
                }
                <div className='loginBox'>

                    <div className='login-row'>
                        <label for="username" className='login-label'>用户名：</label>
                        <input type="text" id='username' ref='username' className='login-input'
                               onKeyDown={this._keyDown}
                               onChange={e=>{this._change('name')}}
                               placeholder='请输入用户名'
                               onBlur={e=>{this._onBlur('name',e.target.value)}}
                        />
                        <span className="errText">{nameErr}</span>
                    </div>
                    <div className='login-row'>
                        <label for="pwd" className='login-label'>密码：</label>
                        <input type="password" id='pwd' ref='pwd' className='login-input'
                               onKeyDown={this._keyDown}
                               onChange={e=>{this._change('pwd')}}
                               placeholder='请输入密码'
                               onBlur={e=>{this._onBlur('pwd',e.target.value)}}/>
                        <span className="errText">{pwdErr}</span>
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
    }))(withRouter(Login))
//export default withRouter(Login)