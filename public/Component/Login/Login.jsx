/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/14 14:46
 * desc:
 *  */
import React,{Component} from 'react'
//import './login.css'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        ajax.get('api/login').query({userName: 'lijian', pwd: '123'}).exchange(function (err, res) {
            console.log(res);
        })

    }

    render() {
        return (
            <div>
                <div className='loginBox'>
                    <label for="">用户名：</label><input type="text"/>
                    <label for="">密码：</label><input type="password"/>
                    <button>登录</button>
                    <button>重置</button>
                </div>
            </div>
        )
    }

}