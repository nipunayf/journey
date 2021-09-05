import './App.css';
import {ChakraProvider} from "@chakra-ui/react";
import theme from './styles/theme';
import Login from './containers/Login/Login';
import Footer from './containers/Footer/Footer';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Login />
            <Footer />
        </ChakraProvider>
    );
}

export default App;
