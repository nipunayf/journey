const winston = require('winston');
require('express-async-errors');

module.exports = function() {
    //Handling uncaught exceptions
    winston.handleExceptions(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    //Handling uncaught rejected promoises. Throws them as exceptions, so they can be handled by winston.
    process.on('unhandledRejection', (e) => {throw e});

    winston.add(winston.transports.File, { filename: 'errors.log' });
}
