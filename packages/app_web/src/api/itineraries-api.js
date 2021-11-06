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
 * Updates the given itinerary. The user is only allowed to change the state and the destinations of the itinerary.
 * @param id
 * @param data
 * @return {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
 */
export const updateItinerary = (id, data) => {
    return databaseServices.putRequest(`${URL}/${id}`, data, true);
}

/**
 * Returns an array of itineraries
 *
 * @param state - required state
 * @return {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
 */
export const getItineraries = (state) => databaseServices.getRequest(`${URL}?${state !== null ? `state=${state}` : ''}`, true);

/**
 * Removes the itinerary from the database
 * @param id
 * @return {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
 */
export const deleteItinerary = id => databaseServices.deleteRequest(`${URL}/${id}`, true);

/**
 * Post a review for the itinerary
 * @param review
 * @returns {Promise<{data: *, message: string}|{code: *, error: *, title: *, message: *}|{code: number, error: *, title: *, message: string}|undefined>}
 */
export const addReview = (id, review) => databaseServices.postRequest(`${URL}/${id}`, {review} , true);



