const {userStore, itineraryStore} = require('../../config/firebase');
const {
    getItineraries,
    getItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary
} = require('../../controllers/itineraries-controller');
const {formatDatetime} = require('../../utils/format');
const {StateEnum} = require('../../utils/constants');

const init = () => {
    res = {
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
    params = Object.assign({
        user: 'a',
        itineraryID: 'z',
        userID: 'a',
        body: null,
        displayName: 'Kumar Sangakkara'
    }, params);
    return {
        user: params.user,
        params: {userID: params.userID, itineraryID: params.itineraryID},
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
        const itNegomboID = await itineraryStore.add(generateItineraryMock({
            location: 'Negombo',
            state: StateEnum.INCOMPATIBLE
        })).then(result => result.path.split('/')[1]);

        const results = await getItineraries(generateReqMock({query: {state: StateEnum.INACTIVE}}), res);
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
        const itNegomboID = await itineraryStore.add(generateItineraryMock({
            location: 'Negombo',
            state: StateEnum.INCOMPATIBLE
        })).then(result => result.path.split('/')[1]);
        const itJaffnaID = await itineraryStore.add(generateItineraryMock({
            location: 'Jaffna',
            state: StateEnum.ACTIVE
        })).then(result => result.path.split('/')[1]);

        const results = await getItineraries(generateReqMock({query: {state: [StateEnum.INACTIVE, StateEnum.INCOMPATIBLE]}}), res);
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
        const result2 = await getItinerary(generateReqMock({
            user: 'j',
            params: {userID: 'j', itineraryID: itKandyID}
        }), res)

        try {
            expect(result1.message).toMatch(/not authorized/);
            expect(result2.message).toMatch(/not authorized/);
        } finally {
            await cleanStore(itKandyID);
        }
    });
});

describe('Create a new itinerary', function () {
    beforeAll(async () => {
        init();
        body = {
            location: 'Kandy',
            destinations: [
                {
                    arrivalDatetime: new Date('2021-10-12T03:20'),
                    departureDatetime: new Date('2021-10-12T05:20'),
                    place_id: 'p'
                }
            ]
        };
        await userStore.add({
            displayName: 'Kumar Sangakkara',
            email: 'sanga@test.com',
            userID: 'a',
            preferences: [0, 0, 0, 0, 0],
            isDeleted: 0
        });
    })

    afterAll(async () => {
        const doc = await userStore.where('userID', '==', 'a').get()
        doc.forEach(element => {
            element.ref.delete();
            console.log(`deleted: ${element.id}`);
        });
    });

    //Firestore database must be updated after creating a new itinerary.
    //The default values must be set for new itineraries (state - INACTIVE, memberInfo, members)
    it('should update the firestore database', async function () {
        const result = await createItinerary(generateReqMock({
            body,
            displayName: 'Kumar Sangakkara'
        }), res);

        //Obtains the created itinerary from the firestore
        const dbResult = await itineraryStore.doc(result.results).get();

        try {
            //Checks if the output of the function is correct
            expect(dbResult.id).toBe(result.results);
            expectPropertyInArray([formatDatetime(result.results, dbResult.data())], {
                location: 'Kandy',
                state: StateEnum.INACTIVE,
                destinations: [
                    {
                        arrivalDatetime: new Date('2021-10-12T03:20'),
                        departureDatetime: new Date('2021-10-12T05:20'),
                        place_id: 'p'
                    }
                ],
                id: result.results,
                members: ['a'],
                memberInfo: {
                    a: {
                        displayName: 'Kumar Sangakkara',
                        review: 0
                    }
                }
            })
        } finally {
            await cleanStore(result.results)
        }
    });

    //Userstore must be updated with the new itinerary
    it('should update user store', async function () {
        const result = await createItinerary(generateReqMock({
            body,
            displayName: 'Kumar Sangakkara'
        }), res);

        //Obtain the user document from the firestore
        const userDoc = await userStore.where('userID', '==', 'a').get();
        const expected = {
            [result.results]: {
                location: 'Kandy',
                state: StateEnum.INACTIVE
            }
        };
        try {
            expectPropertyInArray([userDoc.docs[0].data().itineraries], expected)
        } finally {
            await cleanStore(result.results);
        }
    });

//User should not be able to access a resource of another user
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const result = await createItinerary(generateReqMock({user: 'j'}), res);
        expect(result.message).toMatch(/not authorized/);
    });
})
;

describe('Update an itinerary', function () {
    beforeAll(async () => {
        init();
        USER_ID = 'update-itinerary'
        await userStore.add({
            displayName: 'Kumar Sangakkara',
            email: 'sanga@test.com',
            userID: USER_ID,
            preferences: [0, 0, 0, 0, 0],
            isDeleted: 0
        });
    })

    //Itinerary store must be updated with the new content
    it('should update the itinerary store', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock()).then(result => result.path.split('/')[1]);

        const result = await updateItinerary(generateReqMock({
            itineraryID: itKandyID,
            body: {
                destinations: [
                    {
                        arrivalDatetime: new Date('2021-10-12T03:20'),
                        departureDatetime: new Date('2021-10-12T05:20'),
                        place_id: 'p'
                    },
                    {
                        arrivalDatetime: new Date('2021-10-12T08:20'),
                        departureDatetime: new Date('2021-10-12T09:20'),
                        place_id: 'q'
                    }
                ]
            }
        }), res);

        try {
            expect(result.results).toBeTruthy();
            const dbResult = await itineraryStore.doc(itKandyID).get();
            expect(formatDatetime(itKandyID, dbResult.data()).destinations).toContainEqual({
                arrivalDatetime: new Date('2021-10-12T03:20'),
                departureDatetime: new Date('2021-10-12T05:20'),
                place_id: 'p'
            });
            expect(formatDatetime(itKandyID, dbResult.data()).destinations).toContainEqual({
                arrivalDatetime: new Date('2021-10-12T08:20'),
                departureDatetime: new Date('2021-10-12T09:20'),
                place_id: 'q'
            });
        } finally {
            await cleanStore(itKandyID);
        }
    });


    //The itinerary must be removed from the Userstore if the state is changed to REVIEWED
    it('should update the user store if the state is changed to REVIEWED', async function () {
        //Populate the database
        const itKandyID = await itineraryStore.add(generateItineraryMock({
            state: StateEnum.TO_BE_REVIEWED,
            members: [USER_ID]
        })).then(result => result.path.split('/')[1]);
        const userDocID = await userStore.where('userID', '==', USER_ID).get().then(query => query.docs[0].id);
        const itinerary = {};
        itinerary[itKandyID] = {
            location: 'Kandy',
            state: StateEnum.TO_BE_REVIEWED
        }
        await userStore.doc(userDocID).update({
            itineraries: itinerary
        });

        const result = await updateItinerary(generateReqMock({
            itineraryID: itKandyID,
            body: {state: StateEnum.REVIEWED},
            user: USER_ID,
            userID: USER_ID
        }), res);

        try {
            expect(result.results).toBeTruthy();
            const dbResult = await userStore.where('userID', '==', USER_ID).get();
            if (dbResult.docs[0].data().itineraries)
                expect(Object.keys(dbResult.docs[0].data().itineraries).includes(itKandyID)).toBeFalsy();
        } finally {
            await cleanStore(itKandyID);
        }
    });


    //Must update Userstore when location and/or state is changed
    it('should update the user store if the state and location are being changed', async function () {
        //Populate the database
        const itKandyID = await itineraryStore.add(generateItineraryMock({
            state: StateEnum.TO_BE_REVIEWED,
            members: [USER_ID]
        })).then(result => result.path.split('/')[1]);
        const userDocID = await userStore.where('userID', '==', USER_ID).get().then(query => query.docs[0].id);
        const itinerary = {
            [itKandyID]: {
                location: 'Kandy',
                state: StateEnum.INACTIVE
            }
        };
        await userStore.doc(userDocID).update({
            itineraries: itinerary
        });

        const result = await updateItinerary(generateReqMock({
            itineraryID: itKandyID,
            body: {state: StateEnum.ACTIVE, location: 'Ampara'},
            user: USER_ID,
            userID: USER_ID
        }), res);

        try {
            expect(result.results).toBeTruthy();
            const dbResult = await userStore.where('userID', '==', USER_ID).get();
            expectPropertyInArray([dbResult.docs[0].data().itineraries], {
                [`${itKandyID}`]:
                    {
                        location: 'Ampara',
                        state: StateEnum.ACTIVE
                    }
            });
        } finally {
            await cleanStore(itKandyID);
        }
    });

    //Must update Userstore when only location is changed
    it('should update the user store if only the location is being changed', async function () {
        //Populate the database
        const itKandyID = await itineraryStore.add(generateItineraryMock({
            state: StateEnum.TO_BE_REVIEWED,
            members: [USER_ID]
        })).then(result => result.path.split('/')[1]);
        const userDocID = await userStore.where('userID', '==', USER_ID).get().then(query => query.docs[0].id);
        const itinerary = {
            [itKandyID]: {
                location: 'Kandy',
                state: StateEnum.INACTIVE
            }
        };
        await userStore.doc(userDocID).update({
            itineraries: itinerary
        });

        const result = await updateItinerary(generateReqMock({
            itineraryID: itKandyID,
            body: {location: 'Ampara'},
            user: USER_ID,
            userID: USER_ID
        }), res);

        try {
            expect(result.results).toBeTruthy();
            const dbResult = await userStore.where('userID', '==', USER_ID).get();
            expectPropertyInArray([dbResult.docs[0].data().itineraries], {
                [itKandyID]:
                    {
                        location: 'Ampara'
                    }
            });
        } finally {
            await cleanStore(itKandyID);
        }
    });

    //User should receive an error if there exists no document
    it('should return an error if there is no document', async function () {
        const result = await updateItinerary(generateReqMock(), res);
        expect(result.message).toMatch(/not found/);
    });

    //User should not be able to access a itinerary document of another user
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock()).then(result => result.path.split('/')[1]);

        const result = await getItinerary(generateReqMock({user: 'j', itineraryID: itKandyID}), res);
        try {
            expect(result.message).toMatch(/not authorized/);
        } finally {
            await cleanStore(itKandyID);
        }
    });
});

describe('Delete an existing itinerary', function () {
    beforeAll(async () => {
        init();
        USER_ID = 'delete-itinerary'
        await userStore.add({
            displayName: 'Kumar Sangakkara',
            email: 'sanga@test.com',
            userID: USER_ID,
            preferences: [0, 0, 0, 0, 0],
            isDeleted: 0
        });
    });

    //TODO: Itinerary should be removed from the firestore
    it('should remove the itinerary from firestore', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock({members: [USER_ID]})).then(result => result.path.split('/')[1]);

        const result = await deleteItinerary(generateReqMock({
            user: USER_ID,
            userID: USER_ID,
            itineraryID: itKandyID
        }), res);

        try {
            expect(result).toBeTruthy();

            //Checking the firestore database
            const dbResult = await itineraryStore.doc(itKandyID).get();
            expect(dbResult._fieldsProto).toBeUndefined();
        } finally {
            await cleanStore(itKandyID);
        }
    });

    //Itinerary should be removed from all the users' documents
    it('should remove the itinerary from all the members', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock({members: [USER_ID]})).then(result => result.path.split('/')[1]);

        //Updating the user to be a member of this itinerary
        const userDoc = await userStore.where('userID', '==', USER_ID).get();
        userStore.doc(userDoc.docs[0].id).update({
            itineraries: {
                [itKandyID]: {
                    location: 'Kandy',
                    state: StateEnum.INACTIVE
                }
            }
        });

        const result = await deleteItinerary(generateReqMock({
            user: USER_ID,
            userID: USER_ID,
            itineraryID: itKandyID
        }), res);

        try {
            expect(result).toBeTruthy();

            //Checking the firestore database
            const dbResult = await userStore.doc(userDoc.docs[0].id).get();
            if (dbResult.data().itineraries)
                expect(Object.keys(dbResult.data().itineraries).includes(itKandyID)).toBeFalsy();
        } finally {
            await cleanStore(itKandyID);
        }
    });

    //User should receive an error if there exists no document
    it('should return an error if there is no document', async function () {
        const result = await deleteItinerary(generateReqMock({params: {itineraryID: 'z'}}), res);
        expect(result.message).toMatch(/not found/);
    });

    //User should not be able to access a itinerary document of another user
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock()).then(result => result.path.split('/')[1]);

        const result = await deleteItinerary(generateReqMock({user: 'j', params: {itineraryID: itKandyID}}), res);
        expect(result.message).toMatch(/not authorized/);

        await cleanStore(itKandyID);
    });
});
