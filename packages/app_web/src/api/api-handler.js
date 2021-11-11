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
     * @param setUser - sets the user ID to the url
     * @param output
     * @returns {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
     */
    async getRequest(url, setUser=false, output = 'results') {
        if (setUser) url = setUserID(url);
        try {
            let response = await this.instance.get(url);
            return generateSuccessOutput(response, output);
        } catch (error) {
            return generateErrorOutput(error);
        }
    };

    /**
     * axios post request
     * @param url
     * @param data
     * @param setUser - sets the user ID to the url
     * @param output
     * @returns {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
     */
    async postRequest (url, data, setUser=false, output = 'results') {
        if (setUser) url = setUserID(url);
        try {
            let response = await this.instance.post(url, data);
            return generateSuccessOutput(response ,output);
        } catch (error) {
            return generateErrorOutput(error);
        }
    };

    /**
     * axios put request
     * @param url
     * @param data - optional
     * @param setUser - sets the user ID to the url
     * @param headers
     * @param output
     * @returns {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
     */
    async putRequest (url, data, setUser=false, headers = {}, output = 'results') {
        if (setUser) url = setUserID(url);
        try {
            let response = (data) ? await this.instance.put(url, data, headers) : await this.instance.put(url, headers);
            return generateSuccessOutput(response, output);
        } catch (error) {
            return generateErrorOutput(error);
        }
    };

    /**
     * axios delete request
     * @param url
     * @param setUser - sets the user ID to the url
     * @param output
     * @returns {Promise<{code: *, error: *, title: *, message: *}|{code: *, error: *, title: *, message: string}|{data, message}>}
     */
    async deleteRequest (url, setUser=false, output = 'results') {
        if (setUser) url = setUserID(url);
        try {
            let response = await this.instance.delete(url);
            return generateSuccessOutput(response, output);
        } catch (error) {
            return generateErrorOutput(error);
        }
    };
}

/**
 * Generates an output object for 200 and 201 responses
 * @param response
 * @param output
 * @returns {{data, message}}
 */
const generateSuccessOutput = (response, output) => {
    return {
        data: response.data[output],
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
            code: error.response? error.response.status : 400,
            message: "Cannot connect to the server"
        }
}

/**
 * Attaches the userID to the url
 * @param url
 * @return {string}
 */
const setUserID = url => {
    const userID = localStorage.getItem('userID');
    return `/users/${userID}/`+ url;
}

const databaseServices = new APIHandler(BaseURLEnum.DATABASE_SERVICE)
const mapsServices = new APIHandler(BaseURLEnum.GOOGLE_MAPS)
const wikiServices = new APIHandler(BaseURLEnum.WIKIPEDIA)
const searchServices = new APIHandler(BaseURLEnum.SEARCH_SERVICE)

export {
    databaseServices,
    mapsServices,
    wikiServices,
    searchServices
}

