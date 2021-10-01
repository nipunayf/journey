const {userStore, itineraryStore, transaction} = require('../config/firebase');
const FieldValue = require('firebase-admin').firestore.FieldValue
const {successMessage, errorMessage} = require("../utils/message-template");
const {formatUserDates} = require("../utils/format");

/**
 * Returns a user for given ID
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getUser = async (req, res) => {
    //user attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' details')

    //fetching from firestore
    const result = await userStore.where('userID', '==', req.user).where('isDeleted', '==', 0).get();

    if (result.size > 0) //document found in firestore
        return successMessage(res, formatUserDates(result.docs[0].data(0)))
    else //document not found
        return errorMessage(res, 'User not found', 404)
}

/**
 * Returns a user for a given email
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getUserByEmail = async (req, res) => {
    //fetching from firestore
    const result = await userStore.where('email', '==', req.query.email).where('isDeleted', '==', 0).get();


    if (result.size > 0) //document found in firestore
        return successMessage(res,  (({firstName, lastName, email, profilePic}) => ({firstName, lastName, email, profilePic}))(result.docs[0].data(0)))
    else //document not found
        return errorMessage(res, 'User not found')
}

/**
 * Add an user to the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const addUser = async (req, res) => {
    //user attempting to access another user profile
    if (req.body.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' details')

    //check if the user already exists in the database
    const checkUserResult = await userStore.where('userID', '==', req.body.userID).get()
    if (checkUserResult.size > 0)
        return errorMessage(res, 'User already exists')

    //adds user to the database
    const result = await userStore.add({...req.body, isDeleted: 0, itineraries: {}, preferences: {
            budget: 0,
            popularity: 0,
            energy: 0,
            knowledge: 0,
            introversion: 0
        }});
    return successMessage(res, result);
}

/**
 * Updates the user document
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateUser = async (req, res) => {
    //User attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' details');

    //If user attempts to change the user id
    if (req.body.userID)
        return errorMessage(res, 'You are not allowed to change the user ID', 406);

    //Fetching from firestore
    const result = await userStore.where('userID', '==', req.params.userID).where('isDeleted', '==', 0).get();

    //Document not found in firestore
    if (result.size == 0)
        return errorMessage(res, 'User not found', 404);

    //Updating the firestore
    const batch = transaction();
    batch.update(result.docs[0]._ref, Object.fromEntries(Object.entries(req.body).filter(([_, v]) => v != null)))

    //Updating itinerary store if display name is changed
    if (req.body.displayName) {
        const itineraries = Object.keys(result.docs[0].data().itineraries);
        itineraries.forEach(itinerary => {
            batch.update(itineraryStore.doc(itinerary), {
                memberInfo: {
                    [req.user]: {
                        displayName: req.body.displayName
                    }
                }
            })
        })
    }

    await batch.commit();
    return successMessage(res, true);
}

/**
 * Deletes the user document
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteUser = async (req, res) => {
    //user attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' details');

    const result = await userStore.where('userID', '==', req.params.userID).where('isDeleted', '==', 0).get();
    //document not found in firestore
    if (result.size == 0)
        return errorMessage(res, 'User not found', 404);

    userStore.doc(result.docs[0].id).update({isDeleted: 1});
}

module.exports = {
    getUser,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
}



