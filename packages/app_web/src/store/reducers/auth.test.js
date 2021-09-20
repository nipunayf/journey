import reducer from './auth';
import * as actionTypes from '../actions/action-types';

describe('auth reducer', () => {
    let state;

    beforeEach(() => {
        state = {
            token: null,
            user: null,
            firstName: null,
            lastName: null,
            profilePic: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }
    });

    it('should return initial state for invalid action', () => {
        expect(reducer(undefined, {}))
            .toEqual(state);
    });

    it('should start loading upon auth start', () => {
        expect(reducer(state, {
            type: actionTypes.AUTH_START
        }))
            .toEqual({
                ...state,
                loading: true,
                error: null
            })
    });


    it('should store token and user details upon login', () => {
        expect(reducer(state, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            user: 'some-user',
            firstName: 'user-firstname',
            lastName: 'user-lastname',
            profilePic: 'user-profilepic'
        }))
            .toEqual({
                ...state,
                token: 'some-token',
                user: 'some-user',
                firstName: 'user-firstname',
                lastName: 'user-lastname',
                profilePic: 'user-profilepic'
            });
    });

    it('shuold store error and stop loading upon auth fail', () => {
        expect(reducer(state, {
            type: actionTypes.AUTH_FAIL,
            error: 'some-error',
        }))
            .toEqual({
                ...state,
                error: 'some-error',
                loading: false
            });
    });

    it('should delete token and user information upon logout', () => {
        expect(reducer(state, {
            type: actionTypes.AUTH_LOGOUT
        }))
            .toEqual({
                ...state,
                token: null, 
                user: null, 
                firstName: null, 
                lastName: null, 
                profilePic: null 
            });
    });

    it('should change auth redirect path', () => {
        expect(reducer(state, {
            type: actionTypes.SET_AUTH_REDIRECT_PATH,
            path: '/some-path'
        }))
            .toEqual({
                ...state,
                authRedirectPath: '/some-path'
            })
    });
    

    it('should update name upon change name setting', () => {
        expect(reducer(state, {
            type: actionTypes.UPDATE_NAME,
            firstName: 'some-firstname',
            lastName: 'some-lastname'
        }))
            .toEqual({
                ...state,
                firstName: 'some-firstname',
                lastName: 'some-lastname'
            });
    });

    it('should update profile picture upon change profile picture setting', () => {
        expect(reducer(state, {
            type: actionTypes.UPDATE_PROFILE_PICTURE,
            profilePic: 'some-profilepic'
        }))
            .toEqual({
                ...state,
                profilePic: 'some-profilepic'
            })
    });
});