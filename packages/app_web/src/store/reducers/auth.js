import * as actionTypes from '../actions/action-types';
import {updateObject} from '../../utils/local-storage';

const initialState = {
    token: null,
    user: null,
    email: null,
    isAuthenticated: false
};

/**
 * Updates the user details
 * @param state
 * @param action
 * @return {*}
 */
const authLogin = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user: action.user,
        email: action.email
    });
};

/**
 * Set the authentication status
 * @param state
 * @param action
 * @return {*}
 */
const authSuccess = (state, action) => {
    return updateObject(state, {isAuthenticated: true})
}

/**
 * Remove the user details upon logout
 * @param state
 * @param action
 * @return {*}
 */
const authLogout = (state, action) => {
    return updateObject(state, {token: null, user: null, email: null, isAuthenticated: false});
};

/**
 * Auth reducer
 * @param state
 * @param action
 * @return {{isAuthenticated: boolean, user: null, email: null, token: null}|*}
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOGIN:
            return authLogin(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;
