const router = require('express').Router({mergeParams: true});
const auth = require('../middleware/auth');
const {getItineraries,
    getItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary} = require('../controllers/itineraries-controller');

router.get('/:itineraryID',
    auth,
    getItinerary);

router.get('/',
    auth,
    getItineraries)

router.post('/',
    auth,
    createItinerary)

module.exports = router;
