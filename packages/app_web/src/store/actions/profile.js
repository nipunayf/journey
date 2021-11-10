import * as actionTypes from "./action-types";
import {getObject, storeObject} from "../../utils/local-storage";

export const initializeProfile = (firstName, lastName, profilePic, preferences, itineraries) => {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('profilePic', profilePic);
    storeObject('preferences', preferences);
    storeObject('itineraries', itineraries);

    return {
        type: actionTypes.INITIALIZE_PROFILE,
        firstName,
        lastName,
        profilePic,
        preferences,
        itineraries,
    }
}

export const updateProfile = (firstName, lastName, preferences) => {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    storeObject('preferences', preferences);

    return {
        type: actionTypes.UPDATE_PROFILE,
        firstName,
        lastName,
        preferences
    }
}

export const updateState = (id, state) => {
    const itinerary = getObject('itineraries');
    itinerary[id].state = state;
    storeObject('itineraries', itinerary);

    return {
        type: actionTypes.UPDATE_STATE,
        state,
        id
    }
}

export const addItinerary = (id, object) => {
    const itineraries = getObject('itineraries');
    itineraries[id] = object;
    storeObject('itineraries', itineraries);

    return {
        type: actionTypes.ADD_ITINERARY,
        object,
        id
    }
}

export const removeItinerary = (id) => {
    const itineraries = getObject('itineraries');
    delete itineraries[id];
    storeObject('itineraries', itineraries);

    return {
        type: actionTypes.REMOVE_ITINERARY,
        id
    }
}

export const clearProfile = () => {
    return {
        type: actionTypes.CLEAR_PROFILE
    }
}
