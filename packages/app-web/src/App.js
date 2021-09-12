import React, { Component } from "react";
import {ChakraProvider} from "@chakra-ui/react";
import theme from './styles/theme';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './screens/Main';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Main />
        </ChakraProvider>
    );
}

export default withRouter( connect( null, null )( App ) );
