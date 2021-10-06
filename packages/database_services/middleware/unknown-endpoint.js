const { errorMessage } = require("../utils/message-template");

const unknownEndpoint = (req, res) => {
    return errorMessage(res, "Endpoint Not Found", 404);
}

module.exports = unknownEndpoint;
