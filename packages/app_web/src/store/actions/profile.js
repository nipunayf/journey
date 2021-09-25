import * as actionTypes from "./action-types";
import {storeObject} from "../../utils/local-storage";

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
