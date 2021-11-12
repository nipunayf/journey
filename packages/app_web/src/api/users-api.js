import {databaseServices} from "./api-handler";

const URL = "users";

/**
 * Get user for given id
 * @param id - user id
 * @returns {Promise<{data: *, message: *}|{code: *, error: *, title: *, message: *}|{code: number, error: *, title: *, message: string}|undefined>}
 */
export const getUser = (id) => databaseServices.getRequest(`${URL}/${id}`);

/**
 * Get user for given email
 * @param email
 * @returns {Promise<{data: *, message: *}|{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|undefined>}
 */
export const getUserByEmail = (email) => databaseServices.getRequest(`${URL}?email=${email}`);

/**
 * Creates a new user
 * @param data
 * @returns {Promise<{data: *, message: *}|{code: *, error: *, title: *, message: *}|{code: number, error: *, title: *, message: string}|undefined>}
 */
export const createUser = (data) => databaseServices.postRequest(`${URL}`,data);

/**
 * Updates an existing user
 * @param id
 * @param data
 * @returns {Promise<{data: *, message: *}|{code: *, error: *, title: *, message: *}|{code: number, error: *, title: *, message: string}|undefined>}
 */
export const updateUser = (id, data) => {
    data = Object.assign({firstName: null, lastName: null, preferences: null}, data);
    return databaseServices.putRequest(`${URL}/${id}`, data);
}


