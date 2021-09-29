const {userStore, itineraryStore, transaction} = require('../config/firebase');
const FieldValue = require('firebase-admin').firestore.FieldValue
const {successMessage, errorMessage} = require("../utils/message-template");
const {formatDestinationDates} = require('../utils/format');
const {StateEnum} = require('../utils/constants');


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
        return successMessage(res, result.docs.map(doc => formatDestinationDates(doc.id, (doc.data()))));
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

        return successMessage(res, formatDestinationDates(req.params.itineraryID, result));
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
    console.log(req.user);

    //User attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' itineraries');

    const dates = Object.keys(req.body.destinations);

    //Creates the itinerary document
    const userID = req.user
    const data = {
        location: req.body.location,
        destinations: req.body.destinations,
        state: StateEnum.INACTIVE,
        members: [userID],
        memberInfo: {}
    }
    data.memberInfo[userID] = {displayName: req.body.displayName, review: 0};
    const batch = transaction();
    const itDocRef = itineraryStore.doc();
    batch.create(itDocRef, data);

    //Updating the user document
    const userDocRef = await userStore.where('userID', '==', req.user).get();

    batch.update(userDocRef.docs[0]._ref, {[`itineraries.${itDocRef.id}`]: {
            location: req.body.location,
            state: StateEnum.INACTIVE,
            startDate: new Date(dates[0]),
            endDate: new Date(dates.at(-1)),
            image: req.body.image,
        }});

    //Writing the commits to the firestore
    await batch.commit();
    return successMessage(res, itDocRef.id);
}

/**
 * Update a given itinerary
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updateItinerary = async (req, res) => {
    //User attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' itineraries');

    //Fetching from firestore
    let result = await itineraryStore.doc(req.params.itineraryID).get();

    if (result._fieldsProto) { //Document found in fire store
        const itDocRef = result._ref;
        result = result.data();

        //Check if the user is a member of the itinerary
        if (!result.members.includes(req.user))
            return errorMessage(res, 'You are not authorized to access other users\' itineraries');

        //Updates the itinerary document
        const batch = transaction();
        batch.update(itDocRef, req.body);

        //TODO: Implement a state transition validate algorithm

        let body = {}
        //TODO: Improve the code to support any amount of attributes
        //Itinerary state is being changed
        if (req.body.state) {
            //Since the state is changed to REVIEWED, removing the itinerary from the user store
            if (req.body.state === StateEnum.REVIEWED)
                body = {
                    [`itineraries.${req.params.itineraryID}`]: FieldValue.delete()
                }
            else
                body = {
                    itineraries: {
                        [`${req.params.itineraryID}`]: {state: req.body.state}
                    }
                }

            //If location of the itinerary being change
            if (req.body.location) body.itineraries[req.params.itineraryID].location = req.body.location;
        }

        //If only the location of the itinerary being changed
        else if (req.body.location) {
            body = {
                itineraries: {
                    [`${req.params.itineraryID}`]: {location: req.body.location}
                }
            }
        }

        //Updates all the respective user documents
        if (Object.keys(body).length !== 0) {
            for (const member of result.members) {
                const userDocRef = await userStore.where('userID', '==', member).get();
                batch.update(userDocRef.docs[0]._ref, body)
            }
        }

        await batch.commit();
        return successMessage(res, true);

    } else
        return errorMessage(res, 'Itinerary not found', 404);
}

/**
 * Delete a given itinerary
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteItinerary = async (req, res) => {
    //User attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' itineraries');

    let result = await itineraryStore.doc(req.params.itineraryID).get();

    if (result._fieldsProto) { //Document found in fire store
        const itDocRef = result._ref;
        result = result.data();

        //Check if the user is a member of the itinerary
        if (!result.members.includes(req.user))
            return errorMessage(res, 'You are not authorized to access other users\' itineraries');

        //Delete the itinerary
        const batch = transaction();
        batch.delete(itDocRef);

        //Update the usr documents
        for (const member of result.members) {
            const userDocRef = await userStore.where('userID', '==', member).get();
            batch.update(userDocRef.docs[0]._ref, {
                [`itineraries.${req.params.itineraryID}`]: FieldValue.delete()
            })
        }

        await batch.commit();
        return successMessage(res, true);
    } else
        return errorMessage(res, 'Itinerary not found', 404);
}

module.exports = {
    getItineraries,
    getItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary
}
