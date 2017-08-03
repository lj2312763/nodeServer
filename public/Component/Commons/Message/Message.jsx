/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/6/30 17:05
 * desc:
 *  */

import React,{Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as homeActions from '../../../redux/home/message.actions'

import Reply from './Reply.jsx'
import  './Message.scss'
let index = 0;
/**
 *
 * @param date:数据时间
 * @param str:要转换的格式格式必须为‘xxxx-xx-xx’
 * @returns {string}：返回格式‘2017-08-02’
 * @private
 */
var dateFormat = (date, str)=> {
    var _str = str.split('-');
    var result = '';
    var starIndex = 0;
    for (var i = 0, len = _str.length; i < len; ++i) {
        var tmp = _str[i];
        if (date[starIndex]) {
            result += '-' + date.slice(starIndex, starIndex + tmp.length);
            starIndex += tmp.length;
        }

    }
    result = result.slice(1, result.length);
    return result
}
class Message extends Component {
    constructor(props) {
        super(props);
        let messageList = this.props.home.messageList;
        console.log('**********', messageList)

        let len = 5;
        //for (let i = 1; i <= len; ++i) {
        //    index = i;
        //    const time = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        //    messageList.push({
        //        id: `${i}`,
        //        author: {
        //            name: `匿名${i}`,
        //            img: '/images/diaphoto.png'
        //        },
        //        child: null,
        //        message: '我的留言',
        //        fatherID: '',
        //        time: time
        //    })
        //}
        const replyIndex = null;
        this.state = {
            messageList,
            replyIndex
        };
    }

    static contextTypes = {
        session: React.PropTypes.object,
    }

    componentWillMount() {
        const {homeActions}=this.props;
        //请求消息列表
        homeActions.queryMessageList({offset: 0, limit: 10});
    }

    //点击回复按钮事件
    reply = (e, index)=> {
        this.setState({replyIndex: index})
    }

    //提交回复
    submit = (fatherID, value)=> {
        const {messageList}=this.props.home;
        const {session}=this.context;
        //console.log(this)
        //找到
        const father = messageList.find((item)=>item.id === fatherID);
        index++;
        const time = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        father.child = {
            id: session.id,
            author: {
                name: session.userName,
                img: '/images/diaphoto.png'
            },
            child: null,
            message: value,
            fatherID: fatherID,
            time
        };
        this.setState({replyIndex: null, messageList});
    }
    cancel = ()=> {
        this.setState({replyIndex: null});
    }
    _renderChildren = (item)=> {
        const {author:{
            name,img
            },time,message,id,child}=item;
        const {session}=this.context;
        if (!child && (id === session.id)) {

        }
        return <div className="message-child">
            <div className="message-author">
                        <span className="message-author-name">
                            {name} 回复：
                        </span>
                <span className="message-time"> {time}</span>
            </div>
            <div className="message-content">{message} {
                child && this._renderChildren(child)
            }</div>

        </div>
    }
    _renderMessage = (list)=> {
        const {replyIndex}=this.props.home;
        return <ul>
            { list.map((el, i)=> {
                const {author:{
                    name,img
                    },time,message,id,child}=el;
                return (<li key={id} className="message-item">
                    <div className="message-box">
                        <div className="message-author">
                            <img className="imgIco" src={img} alt=""/>
                        <span className="message-author-name">
                            {name} 留言:
                        </span>
                            <span className="message-time"> {time}</span>
                        </div>
                        <div className="message-content">
                            <div className="message-text">
                                {message}
                            </div>
                            {
                                child && this._renderChildren(child)
                            }</div>

                    </div>

                    <div className={replyIndex===i?'':'d-none'}>
                        <Reply fatherID={id} submit={this.submit} cancel={this.cancel}/>
                    </div>
                    <div className={replyIndex!==i?'':'d-none'}>
                        <button onClick={e=>{this.reply(e,i)}}>
                            回复
                        </button>
                    </div>

                </li>)
            })}
        </ul>

    }

    render() {
        const {messageList}=this.props.home;
        return (
            <div>
                <div className="module-title">消息({messageList.length})</div>
                {this._renderMessage(messageList)}

            </div>
        )
    }
}

export default connect((state)=> {
    return {
        user: state.login.session,
        home: state.home
    }
}, (dispatch)=> ({homeActions: bindActionCreators(homeActions, dispatch)}))(Message)