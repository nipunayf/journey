import reducer from './auth';
import * as actionTypes from '../actions/action-types';

describe('auth reducer', () => {
    let state;

    beforeEach(() => {
        state = {
            token: null,
            user: null,
            email: null,
            isAuthenticated: false
        }
    });

    it('should return initial state for invalid action', () => {
        expect(reducer(undefined, {}))
            .toEqual(state);
    });

    it('should store token and user details upon login', () => {
        expect(reducer(state, {
            type: actionTypes.AUTH_LOGIN,
            token: 'some-token',
            user: 'some-user',
            email: 'some-email',
        }))
            .toEqual({
                ...state,
                token: 'some-token',
                user: 'some-user',
                email: 'some-email',
            });
    });

    it('should set the authentication status upon auth success', () => {
        expect(reducer(state, {
            type: actionTypes.AUTH_SUCCESS,
        }))
            .toEqual({
                ...state,
                isAuthenticated: true
            });
    });

    it('should remove all the local information on log out', () => {
        expect(reducer(state, {
            type: actionTypes.AUTH_LOGOUT,
        }))
            .toEqual({token: null, user: null, email: null, isAuthenticated: false});
    })
});
