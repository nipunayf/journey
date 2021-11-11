const router = require('express').Router({mergeParams: true});
const auth = require('../middleware/auth');
const {getItineraries,
    getItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary, addReview, shiftDates
} = require('../controllers/itineraries-controller');

router.get('/:itineraryID',
    auth,
    getItinerary);

router.get('/',
    auth,
    getItineraries)

router.post('/',
    auth,
    createItinerary)

router.put('/:itineraryID',
    auth,
    updateItinerary)

router.put('/:itineraryID/dates',
    auth,
    shiftDates)

router.post('/:itineraryID',
    auth,
    addReview)

router.delete('/:itineraryID',
    auth,
    deleteItinerary)

module.exports = router;
