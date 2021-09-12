import React from "react";
import { BrowserRouter, Switch, Route, useLocation, Redirect, withRouter } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { connect } from 'react-redux';

import Login from './Login';
import Home from './Home';

const Main = (props) => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact component={Home}/>
                <Route path={'/login'} exact component={Login}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Main;
