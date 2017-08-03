/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/3/15 17:01
 * desc:
 *  */
import React, { Component, PropTypes } from 'react'
import {Router,  Route,  Link ,IndexRoute,IndexRedirect } from 'react-router'
import Login from '../Component/Login/Login.jsx'
import Home from '../Component/Home/Home.jsx'
import homePage from '../Component/Home/HomePage/HomePage.jsx'
import Message from '../Component/Commons/Message/Message.jsx'
import NotFound from'../Component/NotFound/NotFound.jsx'



export default class Routes extends Component {
    render() {

        return (
            <Router history={this.props.history}>
                    <Route  path='/' component={Login}/>
                    <Route  path='/home' component={Home}>
                        <IndexRedirect to="message" />
                        <Route path='homePage' component={homePage}/>
                        <Route path='message' component={Message}/>
                    </Route>
                    <Route  path='*' component={NotFound}/>
            </Router>


        )
    }
}


