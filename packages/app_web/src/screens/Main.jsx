import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';

import Home from './Home';
import Login from './Login';
import Settings from './Settings';
import Footer from "../containers/Footer/Footer";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Itinerary from './Itinerary'
import MyItineraries from "./MyItineraries";
import Search from './Search';

const Main = (props) => {
    return (
        <BrowserRouter>
            <Content isAuthenticated={props.isAuthenticated}/>
            <Footer/>
        </BrowserRouter>
    );
}

const Content = ({isAuthenticated}) => {
    if (isAuthenticated)
        return (
            <Switch>
                <Route path="/" exact component={Dashboard}/>
                <Route path="/settings" exact component={Settings}/>
                <Route path="/itinerary" component={Itinerary}/>
                <Route path="/search" component={Search}/>
                <Route path="/history" component={MyItineraries}/>
                <Redirect to="/"/>
            </Switch>
        );
    else
        return (
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/search" component={Search}/>
                <Route path="/login" component={Login}/>
                <Redirect to="/"/>
            </Switch>
        );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, null)(Main);
