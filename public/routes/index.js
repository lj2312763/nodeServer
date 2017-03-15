/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/15 17:01
 * desc:
 *  */
import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import Login from '../Component/Login/Login.jsx'
import Home from '../Component/Home/Home.jsx'

export default class Routes extends Component {

    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/'>
                    <IndexRedirect path='/login' component={Login}/>
                    <Route path='/home' component={Home}></Route>
                </Route>
            </Router>
        )

    }
}