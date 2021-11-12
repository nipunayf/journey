import * as actionTypes from "./action-types";
import {getObject, storeObject} from "../../utils/local-storage";

/**
 * Update the local user information upon log in
 * @param firstName
 * @param lastName
 * @param profilePic
 * @param preferences
 * @param itineraries
 * @return {{firstName, lastName, preferences, profilePic, itineraries, type: string}}
 */
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

/**
 * Update the user profile information that can be updated through the settings
 * @param firstName
 * @param lastName
 * @param preferences
 * @return {{firstName, lastName, preferences, type: string}}
 */
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

/**
 * Updates the itinerary state
 * @param id
 * @param state
 * @return {{state, id, type: string}}
 */
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

/**
 * Add a new itinerary to the local storage
 * @param id
 * @param object
 * @return {{id, type: string, object}}
 */
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

/**
 * Add an existing itinerary from the itineraries list
 * @param id
 * @return {{id, type: string}}
 */
export const removeItinerary = (id) => {
    const itineraries = getObject('itineraries');
    delete itineraries[id];
    storeObject('itineraries', itineraries);

    return {
        type: actionTypes.REMOVE_ITINERARY,
        id
    }
}

/**
 * Update the itinerary dates
 * @param id itinerary id
 * @param diff number of different days
 * @return {{endDate: (null|*), id, type: string, startDate: *}}
 */
export const updateDates = (id, diff) => {
    const itinerary = getObject('itineraries');
    itinerary[id].startDate = shiftDate(itinerary[id].startDate, diff)
    itinerary[id].endDate = shiftDate(itinerary[id].endDate, diff)
    storeObject('itineraries', itinerary);

    console.log(itinerary[id].startDate);

    return {
        type: actionTypes.UPDATE_DATES,
        startDate: itinerary[id].startDate,
        endDate: itinerary[id].endDate,
        id
    }
}

/**
 * Shift the date by the given number of days
 * @param date date to be shifted
 * @param diff number of days
 * @return {Date}
 */
const shiftDate = (date, diff) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + diff);
    return currentDate
}

/**
 * Remove all profile information
 * @return {{type: string}}
 */
export const clearProfile = () => {
    return {
        type: actionTypes.CLEAR_PROFILE
    }
}
