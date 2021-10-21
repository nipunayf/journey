import * as actionTypes from '../actions/action-types';
import {updateObject} from '../../utils/local-storage';

const initialState = {
    token: null,
    user: null,
    email: null,
    isAuthenticated: false
};

const authLogin = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user: action.user,
        email: action.email
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {isAuthenticated: true})
}

const authLogout = (state, action) => {
    return updateObject(state, {token: null, user: null, email: null, isAuthenticated: false});
};

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