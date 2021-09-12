const {userStore, itineraryStore} = require('../config/firebase')
const {successMessage, errorMessage} = require("../utils/message-template");

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
    const result = await userStore.where('user_id', '==', req.user).where('is_deleted', '==', 0).get();

    if (result.size > 0) //document found in firestore
        return successMessage(res, result.docs[0].data(0))
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
    if (req.body.user_id !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' details')

    //check if the user alrady exists in the database
    const checkUserResult = await userStore.where('user_id', '==', req.body.user_id).get()
    if (checkUserResult.size > 0)
        return errorMessage(res, 'User already exists')

    //adds user to the database
    const result = await userStore.add({...req.body, is_deleted: 0});
    return successMessage(res, result)
}

/**
 * Updates the user document
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateUser = async (req, res) => {
    //user attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' details');

    //if user attempts to change the user id
    if (req.body.user_id)
        return errorMessage(res, 'You are not allowed to change the user ID', 406);

    //fetching from firestore
    const result = await userStore.where('user_id', '==', req.params.userID).where('is_deleted', '==', 0).get();

    //document not found in firestore
    if (result.size == 0)
        return errorMessage(res, 'User not found', 404);

    //updating the firestore
    userStore.doc(result.docs[0].id).update(req.body);
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

    const result = await userStore.where('user_id', '==', req.params.userID).where('is_deleted', '==', 0).get();
    //document not found in firestore
    if (result.size == 0)
        return errorMessage(res, 'User not found', 404);

    userStore.doc(result.docs[0].id).update({is_deleted: 1});
}

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser
}



