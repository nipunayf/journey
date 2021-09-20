import React, {Component, useEffect} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import theme from './styles/theme';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './screens/Main';
import * as actions from "./store/actions";

function App(props) {
    useEffect(() => { props.onTryAutoSignup();}, []);

    return (
        <ChakraProvider theme={theme}>
            <Main />
        </ChakraProvider>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actions.authCheckState() )
    };
};

export default withRouter( connect( null, mapDispatchToProps )( App ) );
