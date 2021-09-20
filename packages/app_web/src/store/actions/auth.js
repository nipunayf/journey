import * as actionTypes from './action-types';
// import axios from '../../api/axios';


export const authSuccess = (token, userID, displayName, profilePic, email) => {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //Saving the user variables
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID);
    localStorage.setItem('displayName', displayName);
    localStorage.setItem('profilePic', profilePic);
    localStorage.setItem('email', email);

    //Set the expiration date
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.setItem('expirationDate', expirationDate);

    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: userID,
        displayName: displayName,
        profilePic: profilePic,
        email: email
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
    localStorage.removeItem('displayName');
    localStorage.removeItem('profilePic');
    localStorage.removeItem('email');
    // delete axios.defaults.headers.common['Authorization'];

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userID = localStorage.getItem('userID');
                const displayName = localStorage.getItem('displayName');
                const profilePic = localStorage.getItem('profilePic');
                const email = localStorage.getItem('email');
                dispatch(authSuccess(token, userID, displayName, profilePic, email));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};





