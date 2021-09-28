/**
 * Output message template for a success message
 *
 * @param {Response} response - http response object
 * @param {object} results - json object of the results
 * @param {string} message - message to display
 * @param {Number} status - status code of the response. default = 200
 */
const successMessage = (response, results, message = "", status = 200) => {
    const output = { results : results, message: message };
    logger(output);
    return response.status(status).send(output);
}

/**
 * Output message tempalte for a error message
 *
 * @param {Response} response - http response object
 * @param {string} message - error message
 * @param {Number} status - status code of the response. default = 400
 */
const errorMessage = (response, message, status = 400) => {
    const output = { results : null, message: message }
    logger(output);
    return response.status(status).send(output);
}

const logger = (output) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('Results: ', output.results);
        console.log('Message: ', output.message);
        console.log('=======');
    }
}

module.exports = {
    successMessage,
    errorMessage
}
