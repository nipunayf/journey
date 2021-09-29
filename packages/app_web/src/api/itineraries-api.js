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
