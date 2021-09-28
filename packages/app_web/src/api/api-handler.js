import axios from "axios";
import {BaseURLEnum} from '../utils/constants';

/**
 * Handles communication with the back-end services
 */
export default class APIHandler {
    constructor(BASE_API) {
        this.instance = axios.create({
            baseURL: BASE_API
        })
    }

    /**
     * Sets the bearer token
     * @param token
     */
    setToken(token) {
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Removes the bearer token from the header
     */
    deleteToken() {
        delete this.instance.defaults.headers.common['Authorization'];
    }

    /**
     * axios get request
     * @param url
     * @returns {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
     */
    async getRequest(url) {
        try {
            let response = await this.instance.get(url);
            return generateSuccessOutput(response);
        } catch (error) {
            return generateErrorOutput(error);
        }
    };

    /**
     * axios post request
     * @param url
     * @param data
     * @returns {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
     */
    async postRequest (url, data) {
        try {
            let response = await this.instance.post(url, data);
            return generateSuccessOutput(response);
        } catch (error) {
            return generateErrorOutput(error);
        }
    };

    /**
     * axios put request
     * @param url
     * @param data - optional
     * @param headers
     * @returns {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
     */
    async putRequest (url, data, headers = {}) {
        try {
            let response = (data) ? await this.instance.put(url, data, headers) : await this.instance.put(url, headers);
            return generateSuccessOutput(response);
        } catch (error) {
            return generateErrorOutput(error);
        }
    };

    /**
     * axios delete request
     * @param url
     * @returns {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
     */
    async deleteRequest (url) {
        try {
            let response = await this.instance.delete(url);
            return generateSuccessOutput(response);
        } catch (error) {
            return generateErrorOutput(error);
        }
    };
}

/**
 * Generates an output object for 200 and 201 responses
 * @param response
 * @returns {{data, message}}
 */
const generateSuccessOutput = (response) => {
    return {
        data: response.data.results,
        message: response.data.message,
    }
}

/**
 * Generates an output object for errors.
 * @param error
 * @returns {{code, error, title, message: string}|{code, error: ({response}|*), title: *, message}}
 */
const generateErrorOutput = (error) => {
    if (error.response)
        return {
            error: error,
            title: error.response.statusText,
            code: error.response.status,
            message: error.response.data.message
        }
    else
        return {
            error: error,
            title: error.message,
            code: error.response.status,
            message: "Cannot connect to the server"
        }
}

const databaseServices = new APIHandler(BaseURLEnum.DATABASE_SERVICE)

export {
    databaseServices
}

