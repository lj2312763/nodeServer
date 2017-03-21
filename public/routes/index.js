/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/15 17:01
 * desc:
 *  */
import React, { Component, PropTypes } from 'react'
import {HashRouter as Router,  Route,  Link ,IndexRoute,IndexRedirect } from 'react-router-dom'
import Login from '../Component/Login/Login.jsx'
import Home from '../Component/Home/Home.jsx'
import NotFound from'../Component/NotFound/NotFound.jsx'



export default class Routes extends Component {

    render() {
        return (

            <Router>
                <div>
                    <Route path='/home' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='*' component={NotFound}/>
                </div>
            </Router>


        )
    }
}


