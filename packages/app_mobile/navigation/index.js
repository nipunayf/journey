import React from 'react';
import Routes from './Routes';
import { Authprovider } from './AuthProvider';

const Providers = () => {
    return(
        <Authprovider>
            <Routes />
        </Authprovider>
    );
};

export default Providers;