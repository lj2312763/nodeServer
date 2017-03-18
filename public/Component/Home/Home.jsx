/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/15 17:00
 * desc:
 *  */
import React,{Component} from 'react'
import { connect } from 'react-redux'

class Home extends Component {
    constructor(props) {
        super(props);
    }

    //props类型
    static propTypes = {};
    //props的默认值
    static defaultProps = {};

    componentWillMount() {
    }

    render() {
        return (
            <div>{this.props.login.message||"Home"}</div>
        )
    }
}
export default connect((state)=>({login:state.login}), ()=>({}))(Home)
