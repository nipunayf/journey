const { authenticate } = require('../config/firebase');
const {errorMessage} = require("../utils/message-template");

const auth = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) return errorMessage(res, "No token, authentication failed", 401);
    const token = authHeader.split(' ')[1]; //'Bearer token'-->['Bearer','token']-->'token'

    authenticate.verifyIdToken(token).then(decoded => {
        req.user = decoded.uid
        next();
    }).catch(err => {
        return errorMessage(res, 'Authentication failed');
    })
}

module.exports = auth
