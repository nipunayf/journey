import {updateObject} from "../../utils/local-storage";
import * as actionTypes from '../actions/action-types';

const initialState = {
    firstName: null,
    lastName: null,
    profilePic: null,
    preferences: null,
    itineraries: null
};

const updateProfile = (state, action) => {
    return updateObject( state, {
        firstName: action.firstName,
        lastName: action.lastName,
        preferences: action.preferences
    })
}

const initializeProfile = (state, action) => {
    return updateObject(state, {
        firstName: action.firstName,
        lastName: action.lastName,
        profilePic: action.profilePic,
        preferences: action.preferences,
        itineraries: action.itineraries
    })
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INITIALIZE_PROFILE: return initializeProfile(state, action);
        case actionTypes.UPDATE_PROFILE: return updateProfile(state, action);
        default:
            return state;
    }
};

export default reducer;
