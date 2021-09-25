import * as actionTypes from './action-types';
import axios from  '../../api/axios'
import {clearProfile, initializeProfile} from "./profile";
import {getObject} from "../../utils/local-storage";


export const authSuccess = (token, userID, email) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //Saving the user variables
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID);
    localStorage.setItem('email', email);

    //Set the expiration date
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.setItem('expirationDate', expirationDate);

    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: userID,
        email: email
    };
};

export const clearAuth = () => {
    localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(clearAuth())
        dispatch(clearProfile())
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
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
                const email = localStorage.getItem('email');
                const firstName = localStorage.getItem('firstName');
                const lastName = localStorage.getItem('lastName');
                const profilePic = localStorage.getItem('profilePic');
                const preferences = getObject('preferences');
                const itineraries = getObject('itineraries');
                dispatch(authSuccess(token, userID, email));
                dispatch(initializeProfile(firstName, lastName, profilePic, preferences, itineraries))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};
