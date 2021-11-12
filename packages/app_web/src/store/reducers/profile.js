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

const clearProfile = (state, action) => {
    return updateObject(state, {
        firstName: null,
        lastName: null,
        profilePic: null,
        preferences: null,
        itineraries: null
    })
}

const updateState = (state, action) => {
    const itineraries = state.itineraries;
    itineraries[action.id].state = action.state

    return updateObject(state, {
        itineraries
    })
}

const addItinerary = (state, action) => {
    const itineraries = state.itineraries;
    itineraries[action.id] = action.object;

    return updateObject(state, {
        itineraries
    })
}

const removeItinerary = (state, action) => {
    const itineraries = state.itineraries;
    delete itineraries[action.id];

    return updateObject(state, {
        itineraries
    })
}

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
