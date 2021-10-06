const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/users/:userID/itineraries', require('./itineraries'))
router.use('/users/:userID/itineraries/:itineraryID/members', require('./members'))

module.exports = router;
