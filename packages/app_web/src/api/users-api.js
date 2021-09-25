import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "users";

/**
 * Get user for given id
 * @param id - user id
 * @returns {Promise<{data: *, message: *}|{code: *, error: *, title: *, message: *}|{code: number, error: *, title: *, message: string}|undefined>}
 */
export const getUser = (id) => getRequest(`${URL}/${id}`);

/**
 * Creates a new user
 * @param data
 * @returns {Promise<{data: *, message: *}|{code: *, error: *, title: *, message: *}|{code: number, error: *, title: *, message: string}|undefined>}
 */
export const createUser = (data) => postRequest(`${URL}`,data);

// export const editUserProfile = (id, data) => {
//     data = Object.assign({first_name: null, last_name: null, method: null}, data);
//     return putRequest(`${URL}/${id}`, data);
// }
//
// export const deleteUser = (id) => deleteRequest(`${URL}/${id}`);


