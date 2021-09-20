const {errorMessage, successMessage} = require("../utils/message-template");
const {userStore, itineraryStore, transaction} = require("../config/firebase");
const FieldValue = require('firebase-admin').firestore.FieldValue
const {StateEnum} = require("../utils/constants");


/**
 * Add a member to the itinerary
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const addMembers = async (req, res) => {
    //User attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' itineraries');

    //Fetching the itinerary document from firestore
    const itDoc = await itineraryStore.doc(req.params.itineraryID).get();
    const itinerary = itDoc.data();

    //Itinerary document not found
    if (!itDoc._fieldsProto)
        return errorMessage(res, 'Itinerary not found', 404);

    const batch = transaction()

    //Requesting user is not a member of the itinerary
    if (!itinerary.members.includes(req.user))
        return errorMessage(res, 'You are not authorized to access other users\' itineraries');

    const memberIDs = []
    const memberInfo = {}

    //Updating the user document of each new member
    for (const memberEmail of req.body) {
        const userDoc = await userStore.where('email', '==', memberEmail).get();

        //Member's document not found
        if (userDoc.size <= 0)
            return errorMessage(res, `User for ${req.body[memberEmail]} not found`, 404);

        const member = userDoc.docs[0].data();

        //Checks if user is already a member
        if (Object.keys(member.itineraries).includes(req.params.itineraryID))
            return errorMessage(res, `User for ${memberEmail} is already a member`);

        //Updating the user document
        batch.update(userDoc.docs[0]._ref, {
            [`itineraries.${req.params.itineraryID}`]: {
                location: itinerary.location,
                state: StateEnum.INACTIVE
            }
        });

        //Updating member ids and member information
        memberIDs.push(member.userID);
        memberInfo[`memberInfo.${member.userID}`] = {
            displayName: member.displayName,
            accepted: false,
            review: 0
        }
    }

    //There are not member ids or member information
    if (memberIDs.length === 0 || Object.keys(memberInfo).length === 0)
        return errorMessage(res, 'Something went wrong', 500)

    //Updating the itinerary document
    batch.update(itDoc._ref, {
        members: [...itinerary.members, ...memberIDs]
    });
    batch.update(itDoc._ref, memberInfo);

    await batch.commit();
    return successMessage(res, true);
}

/**
 * Deletes a member from the itinerary
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteMember = async (req, res) => {
    //User attempting to access another user profile
    if (req.params.userID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' itineraries');

    //Fetching the itinerary document from firestore
    const itDoc = await itineraryStore.doc(req.params.itineraryID).get();
    const itinerary = itDoc.data();

    //Itinerary document not found
    if (!itDoc._fieldsProto)
        return errorMessage(res, 'Itinerary not found', 404);

    const batch = transaction()

    //Requesting user is not a member of the itinerary
    if (!itinerary.members.includes(req.user))
        return errorMessage(res, 'You are not authorized to access other users\' itineraries');

    //Fetching the user document of the member being deleted
    //Removes the itinerary from the user's document
    const userDoc = await userStore.where('userID', '==', req.params.memberID).get();
    const member = userDoc.docs[0].data();

    //Member's document not found
    if (userDoc.size <= 0)
        return errorMessage(res, `User not found`, 404);

    //Checks if user is already a member
    if (!Object.keys(member.itineraries).includes(req.params.itineraryID))
        return errorMessage(res, `User is not a member of the itinerary`);

    //Removes the itinerary from the user document
    batch.update(userDoc.docs[0]._ref, {
        [`itineraries.${req.params.itineraryID}`]: FieldValue.delete()
    });

    //Removes the user from the itinerary
    batch.update(itDoc._ref, {
        members: FieldValue.arrayRemove(req.params.memberID)
    });
    batch.update(itDoc._ref, {
        [`memberInfo.${req.params.memberID}`]: FieldValue.delete()
    });

    await batch.commit();
    return successMessage(res, true);
}

const updateMember = async (req, res) => {
    //User attempting to access another user profile
    if (req.params.userID !== req.user && req.params.memberID !== req.user)
        return errorMessage(res, 'You are not authorized to access other users\' itineraries');

    //Fetching the itinerary document from firestore
    const itDoc = await itineraryStore.doc(req.params.itineraryID).get();
    const itinerary = itDoc.data();

    //Itinerary document not found
    if (!itDoc._fieldsProto)
        return errorMessage(res, 'Itinerary not found', 404);

    //Requesting user is not a member of the itinerary
    if (!itinerary.members.includes(req.user))
        return errorMessage(res, 'You are not authorized to access other users\' itineraries');

    //Updates the itinerary
    const parameter = Object.keys(req.body)[0];
    await itineraryStore.doc(req.params.itineraryID).update({
        [`memberInfo.${req.user}.${parameter}`]: req.body[parameter]
    })
    return successMessage(res, true);
}

module.exports = {
    addMembers,
    deleteMember,
    updateMember
}
