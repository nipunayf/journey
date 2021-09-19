const {StateEnum} = require("./constants");
const {itineraryStore} = require("../config/firebase");
/**
 * Generates a request mock object
 * @param params
 * @returns {{params: {itineraryID: string, userID: string}, user: string}}
 */
const generateReqMock = params => {
    params = Object.assign({
        user: 'a',
        itineraryID: 'z',
        userID: 'a',
        body: null,
        displayName: 'Kumar Sangakkara',
        memberID: null
    }, params);
    return {
        user: params.user,
        params: {userID: params.userID, itineraryID: params.itineraryID, memberID: params.memberID},
        query: params.query,
        body: params.body,
        displayName: params.displayName
    }
}

/**
 * Generates an itinerary mock object
 * @param params
 * @returns {{memberInfo: {userID: {displayName: string, review: number}}, destinations: [{arrivalDatetime: Date, departureDatetime: Date, place_id: string}], members: string[], location: string}}
 */
const generateItineraryMock = params => {
    params = Object.assign({members: ['a'], location: 'Kandy', state: StateEnum.INACTIVE}, params);
    return {
        location: params.location,
        state: params.state,
        destinations: [
            {
                arrivalDatetime: new Date('2021-10-12T03:20'),
                departureDatetime: new Date('2021-10-12T05:20'),
                place_id: 'p'
            }
        ],
        members: params.members,
        memberInfo: {
            [`${params.members[0]}`]: {
                displayName: 'Kumar Sangakkara',
                review: 0
            }
        }
    }
}

/**
 * Deletes the itinerary from the firestore.
 * @param id
 * @returns {Promise<void>}
 */
const removeItinerary = async (id) => {
    const doc = await itineraryStore.doc(id).get();
    doc.ref.delete();
    console.log(`deleted: ${id}`);
}

/**
 * Checking if an array posses an object with the given key set
 * @param array - contains the relative objects
 * @param object - required key set
 */
const expectPropertyInArray = (array, object) => {
    expect(array).toEqual(
        expect.arrayContaining([
            expect.objectContaining(object)
        ])
    );
}

module.exports = {
    generateReqMock,
    generateItineraryMock,
    removeItinerary,
    expectPropertyInArray
}
