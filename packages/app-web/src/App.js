import './App.css';
import {ChakraProvider} from "@chakra-ui/react";
import theme from './styles/theme';
import Home from './screens/Home'
import Search from "./screens/Search";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./containers/Navbar/Navbar";


function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/Search" component={Search}/>
                </Switch>
            </Router>
        </ChakraProvider>
    );
}

export default App;
