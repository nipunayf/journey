const {userStore, itineraryStore} = require('../config/firebase')
const {successMessage, errorMessage} = require("../utils/message-template");

/**
 * Returns a user for given ID
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getUser = async (req, res) => {
    if (req.params.userID !== req.user) //user attempting to access another user profile
        return errorMessage(res, 'You are not authorized to access other users\' details')

    //fetching from firestore
    const result = await userStore.where('user_id', '==', req.user).get();

    if(result.size > 0) //document found in firestore
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
    if (req.body.user_id !== req.user) //user attempting to access another user profile
        return errorMessage(res, 'You are not authorized to access other users\' details')

    //check if the user alrady exists in the database
    const checkUserResult = await userStore.where('user_id', '==', req.body.user_id).get()
    if (checkUserResult.size > 0)
        return errorMessage(res, 'User already exists')

    //adds user to the database
    const result = await userStore.add(req.body);
    return successMessage(res, result)
}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

module.exports = {
    getUser,
    addUser
}



