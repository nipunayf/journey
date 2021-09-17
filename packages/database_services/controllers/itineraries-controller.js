const {userStore, itineraryStore} = require('../config/firebase');
const {successMessage, errorMessage} = require("../utils/message-template");

/**
 * Get multiple itineraries of a user.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getItineraries = async (req, res) => {
    //User attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' itineraries')

    let result = itineraryStore.where('members', 'array-contains', req.user);

    //If there are any filters
    if (req.query) {
        //If only single state is given
        if (Number.isInteger(req.query.state))
            result = result.where('state', '==', req.query.state);

        //If an array of states are given
        else if (Array.isArray(req.query.state))
            result = result.where('state', 'in', req.query.state);
    }

    result = await result.get();

    if (result.size > 0) {
        return successMessage(res, result.docs.map(doc => formatDatetime(doc.id, (doc.data()))));
    } else
        return errorMessage(res, 'Itinerary not found');
}

/**
 * Get a single itinerary of a user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getItinerary = async (req, res) => {
    //User attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' itineraries');

    //Fetching from firestore
    let result = await itineraryStore.doc(req.params.itineraryID).get();

    if (result._fieldsProto) { //Document found in fire store
        result = result.data();

        //Check if the user is a member of the itinerary
        if (!result.members.includes(req.user))
            return errorMessage(res, 'You are not authorized to access other users\' itineraries');

        return successMessage(res, formatDatetime(req.params.itineraryID, result));
    } else
        return errorMessage(res, 'Itinerary not found');
}

/**
 * Create a new itinerary
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const createItinerary = async (req, res) => {

}

/**
 * Update a given itinerary
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updateItinerary = async (req, res) => {

}

/**
 * Delete a given itinerary
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteItinerary = async (req, res) => {

}

const formatDatetime = (id, object) => {
    const destinations = object.destinations;
    destinations.forEach(item => {
        item.departureDatetime = new Date(item.departureDatetime.seconds * 1000 + item.departureDatetime.nanoseconds / 1000000)
        item.arrivalDatetime = new Date(item.arrivalDatetime.seconds * 1000 + item.arrivalDatetime.nanoseconds / 1000000)
    });

    return {
        ...object,
        id,
        destinations
    }
}

module.exports = {
    getItineraries,
    getItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary
}


