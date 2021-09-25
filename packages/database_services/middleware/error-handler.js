const { errorMessage } = require("../utils/message-template");

const errorLog = (...params) => {
    console.error(...params);
}

const errorHandler = (error, req, res, next) => {
    errorLog(error.message);
    console.log(error);

    return errorMessage(res, 'Oh no! Something went wrong', 500);
}

module.exports = errorHandler;
