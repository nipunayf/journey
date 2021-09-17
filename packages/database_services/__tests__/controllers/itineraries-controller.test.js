const {userStore, itineraryStore} = require('../../config/firebase')
const {
    getItineraries,
    getItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary
} = require('../../controllers/itineraries-controller');

const init = () => {
     const res = {
        status: () => {
            return {
                send: (output) => {
                    return output
                }
            }
        }
    };
}

/**
 * Generates a request mock object
 * @param params
 * @returns {{params: {itineraryID: string, userID: string}, user: string}}
 */
const generateReqMock = params => {
    params = Object.assign({user: 'a', itineraryID: 'z', userID: 'a', body: null}, params);
    return {
        user: params.user,
        params: {userID: params.userID, itineraryID: params.itineraryID},
        query: params.query,
        body: params.body
    }
}

/**
 * Generates an itinerary mock object
 * @param params
 * @returns {{memberInfo: {userID: {displayName: string, review: number}}, destinations: [{arrivalDatetime: Date, departureDatetime: Date, place_id: string}], members: string[], location: string}}
 */
const generateItineraryMock = params => {
    params = Object.assign({members: ['a'], location: 'Kandy', state: 1}, params);
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
            userID: {
                displayName: 'Kumar Sangakkara',
                review: 0
            }
        }
    };
}

/**
 * Deletes the itinerary from the firestore.
 * @param id
 * @returns {Promise<void>}
 */
const cleanStore = async (id) => {
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

describe('Getting existing itineraries', function () {
    beforeEach(() => {
        init()
    })

    //User should be able to get all the itineraries of his.
    it('should return all the itineraries of the user', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock()).then(result => result.path.split('/')[1]);
        const itNegomboID = await itineraryStore.add(generateItineraryMock({location: 'Negombo'})).then(result => result.path.split('/')[1]);

        const results = await getItineraries(generateReqMock(), res);
        try {
            expect(results.results).toHaveLength(2);
            expectPropertyInArray(results.results, {id: itKandyID});
            expectPropertyInArray(results.results, {id: itNegomboID});
        } finally {
            await cleanStore(itKandyID);
            await cleanStore(itNegomboID);
        }
    });

    //Should accept a single state as a parameter
    it('should return itineraries for a given single state variable', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock()).then(result => result.path.split('/')[1]);
        const itNegomboID = await itineraryStore.add(generateItineraryMock({location: 'Negombo', state: 2})).then(result => result.path.split('/')[1]);

        const results = await getItineraries(generateReqMock({query: {state: 1}}), res);
        try {
            expect(results.results).toHaveLength(1);
            expectPropertyInArray(results.results, {id: itKandyID});
        } finally {
            await cleanStore(itKandyID);
            await cleanStore(itNegomboID);
        }
    });

    //Should accept array of states as a parameter
    it('should return itineraries for a given array of state variables', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock()).then(result => result.path.split('/')[1]);
        const itNegomboID = await itineraryStore.add(generateItineraryMock({location: 'Negombo', state: 2})).then(result => result.path.split('/')[1]);
        const itJaffnaID = await itineraryStore.add(generateItineraryMock({location: 'Jaffna', state: 3})).then(result => result.path.split('/')[1]);

        const results = await getItineraries(generateReqMock({query: {state: [1, 2]}}), res);
        try {
            expect(results.results).toHaveLength(2);
            expectPropertyInArray(results.results, {id: itKandyID});
            expectPropertyInArray(results.results, {id: itNegomboID});
        } finally {
            await cleanStore(itKandyID);
            await cleanStore(itNegomboID);
            await cleanStore(itJaffnaID);
        }
    });

    //User should receive an error if there exists no document
    it('should return an error if there are no documents', async function () {
        const result = await getItineraries(generateReqMock(), res);
        expect(result.message).toMatch(/not found/);
    });

    //User should not be able to access a itinerary document of another user
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const result = await getItineraries(generateReqMock({user: 'x'}), res);
        expect(result.message).toMatch(/not authorized/);
    });
});

describe('Getting an existing itinerary', function () {
    beforeEach(() => {
        init()
    });

    //All the members of the itinerary should access the itinerary from their own resources
    it('should allow users to access the itinerary from their resource', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock({members: ['a', 'b']})).then(result => result.path.split('/')[1]);

        const usr1Result = await getItinerary(generateReqMock({userID: 'a', itineraryID: itKandyID}), res);
        const usr2Result = await getItinerary(generateReqMock({user: 'b', userID: 'b', itineraryID: itKandyID}), res);
        try {
            expect(usr1Result).toStrictEqual(usr2Result);
            expect(usr1Result.results).toStrictEqual({...generateItineraryMock({members: ['a', 'b']}), id: itKandyID})
        } finally {
            await cleanStore(itKandyID);
        }
    });

    //User should receive an error if there exists no document
    it('should return an error if there is no document', async function () {
        const result = await getItinerary(generateReqMock(), res);
        expect(result.message).toMatch(/not found/);
    });

    //User should not be able to access a itinerary document of another user
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock()).then(result => result.path.split('/')[1]);

        const result1 = await getItinerary(generateReqMock({user: 'j', params: {itineraryID: itKandyID}}), res);
        const result2 = await getItinerary(generateReqMock({user: 'j', params: {userID: 'j', itineraryID: itKandyID}}), res)

        try {
            expect(result1.message).toMatch(/not authorized/);
            expect(result2.message).toMatch(/not authorized/);
        } finally {
            await cleanStore(itKandyID);
        }
    });
});

describe('Create a new itinerary', function () {

    //Firestore database must be updated after creating a new itinerary
    it('should update the firestore database', async function () {
        const result = await createItinerary(generateReqMock({body: {

            }}), res);
    });

    //

    //User should not be able to access a itinerary document of another user
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const result = await createItinerary(generateReqMock({user: 'j', params: {itineraryID: itKandyID}}));
        expect(result.message).toMatch(/not authorized/);
    });
});

describe('Update an itinerary', function () {

    //User should receive an error if there exists no document
    it('should return an error if there is no document', async function () {
        const result = await updateItinerary({...req, params: {itineraryID: 'z'}}, res);
        expect(result.message).toMatch(/not found/);
    });

    //User should not be able to access a itinerary document of another user
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const itKandyID = await itineraryStore.add(itMock).then(result => result.path.split('/')[1]);

        const result = await getItinerary({user: 'j', params: {...req.params, itineraryID: itKandyID}});
        expect(result.message).toMatch(/not authorized/);

        await cleanStore(itKandyID);
    });
});

describe('Delete an existing itinerary', function () {

    //User should receive an error if there exists no document
    it('should return an error if there is no document', async function () {
        const result = await cleanStore({...req, params: {itineraryID: 'z'}}, res);
        expect(result.message).toMatch(/not found/);
    });

    //User should not be able to access a itinerary document of another user
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const itKandyID = await itineraryStore.add(itMock).then(result => result.path.split('/')[1]);

        const result = await cleanStore({user: 'j', params: {itineraryID: itKandyID}});
        expect(result.message).toMatch(/not authorized/);

        await cleanStore(itKandyID);
    });
});
