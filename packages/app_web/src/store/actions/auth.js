import * as actionTypes from './action-types';
import {databaseServices} from '../../api/api-handler'
import {clearProfile, initializeProfile} from "./profile";
import {getObject, storeObject} from "../../utils/local-storage";

/**
 * Updates the local information upon authentication
 * @param token
 * @param userID
 * @param email
 * @return {{type: string, user, email, token}}
 */
export const authLogin = (token, userID, email) => {
    databaseServices.setToken(token);

    //Saving the user variables
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID);
    localStorage.setItem('email', email);

    //Set the expiration date
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.setItem('expirationDate', expirationDate);

    return {
        type: actionTypes.AUTH_LOGIN,
        token: token,
        user: userID,
        email: email
    };
};

/**
 * Set the local authentication status
 * @return {{type: string}}
 */
export const authSuccess = () => {
    storeObject('isAuthenticated', true)

    return {
        type: actionTypes.AUTH_SUCCESS
    }
}

/**
 * Removes all the local authentication information
 * @return {{type: string}}
 */
export const clearAuth = () => {
    localStorage.clear();
    databaseServices.deleteToken();

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

/**
 * Remove all the local information upon sign out
 * @return {(function(*): void)|*}
 */
export const logout = () => {
    return dispatch => {
        dispatch(clearAuth())
        dispatch(clearProfile())
    }
}

/**
 * Log out when the expiration date is reached
 * @param expirationTime
 * @return {(function(*): void)|*}
 */
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

/**
 * Log back to the system if the expiration date is not reached
 * @return {(function(*): void)|*}
 */
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const isAuthenticated = getObject('isAuthenticated');
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else if (isAuthenticated) {
                const userID = localStorage.getItem('userID');
                const email = localStorage.getItem('email');
                const firstName = localStorage.getItem('firstName');
                const lastName = localStorage.getItem('lastName');
                const profilePic = localStorage.getItem('profilePic');
                const preferences = getObject('preferences');
                const itineraries = getObject('itineraries');

                dispatch(authLogin(token, userID, email));
                dispatch(initializeProfile(firstName, lastName, profilePic, preferences, itineraries));
                dispatch(authSuccess());
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};
