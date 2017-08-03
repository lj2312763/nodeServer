/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/6/28 16:31
 * desc:
 *  */

import React,{Component} from 'react'
import './PersonalInfo.scss'
import {Link} from 'react-router'

export default class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseModule: 0
        };
        this.mainModule = [
            {title: '主页', pathname: '/home/homePage'},
            {title: '消息', pathname: '/home/message'},
            {title: '个人设置', pathname: '/home/personalSet'},
        ]
    }

    /**
     * 选择模块
     * @param{Number}index:显示模块的下标位置
     * */
    _chooseModule = (index)=> {
        this.setState({
            chooseModule:index
        })
    }

    render() {
        const csession = {
            name: '李健',
            post: 'boss',
        }
        let {chooseModule}=this.state;
        const imgSrc = csession.avatar ? 'api/account/media.de?id=' + csession.avatar : '../../../images/diaphoto.png';
        return (
            <div className="PersonalAside">
                <div className="paImgArea">
                    <img src={imgSrc}/>
                    <div className="paContent">
                        {/*lijian,2016-12-15,DE-1562*/}
                        <h2 title={csession.name}>{csession.name}</h2>
                        <p title={csession.post}>{csession.post}</p>
                    </div>
                    <span>
                        {/*经验条*/}
                        <span className="levelBar"></span>
                    <i>level 12</i>
                    </span>

                </div>
                <ul className="paUserInfo">
                    <li>电话: 0755-12345678</li>
                    <li>传真: 0755-12345677</li>
                    <li>邮件: lj2312763@163.com</li>
                </ul>
                <ul className="paAside">
                    {this.mainModule.map((item, index)=> {
                        return (
                            <Link to={item.pathname}  key={item.pathname}>
                            <li key={item.pathname}
                                className={chooseModule===index?'active':''}
                                onClick={e=>this._chooseModule(index)}>
                                 {item.title}
                            </li>
                            </Link>)

                    })}

                </ul>
            </div>
        )
    }
}