import {databaseServices} from "./api-handler";

const URL = "itineraries";

/**
 * Creates a new itinerary
 * @param data
 * @returns {Promise<{data: *, message: string}|{code: *, error: *, title: *, message: *}|{code: number, error: *, title: *, message: string}|undefined>}
 */
export const createItinerary = (data) => databaseServices.postRequest(`${URL}`,data, true);

/**
 * Returns an itinerary for a given id
 * @param id
 * @return {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
 */
export const getItinerary = (id) => databaseServices.getRequest(`${URL}/${id}`, true);

/**
 * Updtes the given itinerary. The user is only allowed to change the state and the destinations of the itinerary.
 * @param id
 * @param data
 * @return {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
 */
export const updateItinerary = (id, data) => {
    // data = Object.assign({ state: null, destinations: null }, data);
    return databaseServices.putRequest(`${URL}/${id}`, data, true);
}
