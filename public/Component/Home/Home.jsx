/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/15 17:00
 * desc:
 *  */
import React,{Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import './Home.scss'
import PersonalInfo from './PersonalInfo/PersonalInfo.jsx'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personal: [{
                title: '主页'
            }]
        };

    }

    //props类型
    static propTypes = {};
    //props的默认值
    static defaultProps = {};

    componentWillMount() {
    }

    render() {
        let personalInfo = <PersonalInfo />;
        //let personalInfo='';
        return (
            <div className="personal-box">
                <div className="panelBox">
                    <div className="panel-inner-box">
                        {personalInfo}
                    </div>

                </div>
                <div className="contentBox">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default connect((state)=>({login: state.login}), ()=>({}))(Home)
