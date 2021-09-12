import React from "react";
import { BrowserRouter, Switch, Route, useLocation, Redirect, withRouter } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { connect } from 'react-redux';

import Home from './Home';
import Login from './Login';
import Register from './Register';

const Main = (props) => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact component={Home}/>
                <Route path={'/login'} exact component={Login}/>
                <Route path={'/register'} exact component={Register}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Main;
