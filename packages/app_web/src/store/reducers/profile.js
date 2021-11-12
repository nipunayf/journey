import {updateObject} from "../../utils/local-storage";
import * as actionTypes from '../actions/action-types';

const initialState = {
    firstName: null,
    lastName: null,
    profilePic: null,
    preferences: null,
    itineraries: null
};

/**
 * Update profile information that can be updated by settings
 * @param state
 * @param action
 * @return {*}
 */
const updateProfile = (state, action) => {
    return updateObject( state, {
        firstName: action.firstName,
        lastName: action.lastName,
        preferences: action.preferences
    })
}

/**
 * Set the user information upon sign in
 * @param state
 * @param action
 * @return {*}
 */
const initializeProfile = (state, action) => {
    return updateObject(state, {
        firstName: action.firstName,
        lastName: action.lastName,
        profilePic: action.profilePic,
        preferences: action.preferences,
        itineraries: action.itineraries
    })
}

/**
 * Clear all the user information
 * @param state
 * @param action
 * @return {*}
 */
const clearProfile = (state, action) => {
    return updateObject(state, {
        firstName: null,
        lastName: null,
        profilePic: null,
        preferences: null,
        itineraries: null
    })
}

/**
 * Update the state of a given itinerary
 * @param state
 * @param action
 * @return {*}
 */
const updateState = (state, action) => {
    const itineraries = state.itineraries;
    itineraries[action.id].state = action.state

    return updateObject(state, {
        itineraries
    })
}

/**
 * Add a new itinerary to the list
 * @param state
 * @param action
 * @return {*}
 */
const addItinerary = (state, action) => {
    const itineraries = state.itineraries;
    itineraries[action.id] = action.object;

    return updateObject(state, {
        itineraries
    })
}

/**
 * Remove an existing itinerary from the list
 * @param state
 * @param action
 * @return {*}
 */
const removeItinerary = (state, action) => {
    const itineraries = state.itineraries;
    delete itineraries[action.id];

    return updateObject(state, {
        itineraries
    })
}

/**
 * Updates the dates of the given itinerary
 * @param state
 * @param action
 * @return {*}
 */
const updateDates = (state, action) => {
    const itineraries = state.itineraries;
    itineraries[action.id].startDate = action.startDate
    itineraries[action.id].endDate = action.endDate

    return updateObject(state, {
        itineraries
    })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INITIALIZE_PROFILE: return initializeProfile(state, action);
        case actionTypes.UPDATE_PROFILE: return updateProfile(state, action);
        case actionTypes.CLEAR_PROFILE: return clearProfile(state, action);
        case actionTypes.UPDATE_STATE: return updateState(state, action);
        case actionTypes.ADD_ITINERARY: return addItinerary(state, action);
        case actionTypes.REMOVE_ITINERARY: return removeItinerary(state, action);
        case actionTypes.UPDATE_DATES: return updateDates(state, action);
        default:
            return state;
    }
};

export default reducer;
