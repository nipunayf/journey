const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

const requestLogger = (req, res, next) => {
    info('Method:', req.method);
    info('Path:  ', req.path);
    info('Body:  ', req.body);
    info('Query: ', req.query);
    info('---');
    next();
}

module.exports = requestLogger
