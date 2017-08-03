/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/7/31 14:25
 * desc:
 *  */

import React,{Component, PropTypes} from 'react'
import './Reply.scss'

export default class Reply extends Component {
    static defaultProps = {
        submit: ()=> {
        },
        cancel: ()=> {
        }

    }
    static defaultPropTypes = {
        submit: PropTypes.func,
        cancel: PropTypes.func,
        fatherID: PropTypes.string
    }
    /**
     * 提交回复
     * @param e
     * @private
     */
    _submit = (e)=> {
        const {submit,fatherID}=this.props;
        const value = this.refs.message.value;
        submit(fatherID, value);
        this.refs.message.value = '';
    }

    _cancel = (e)=> {
        const {cancel}=this.props;
        cancel();
        this.refs.message.value = '';
    }

    render() {
        return (
            <div>
                <textarea ref="message" className="replyText" name="" id="" cols="30" rows="10">

                </textarea>
                <button onClick={this._submit}>提交</button>
                <button onClick={this._cancel}>取消</button>
            </div>
        )
    }
}