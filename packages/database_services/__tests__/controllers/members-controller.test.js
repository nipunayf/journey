const {userStore, itineraryStore} = require('../../config/firebase');
const {generateReqMock, generateItineraryMock, removeItinerary, expectPropertyInArray} = require('../../utils/mock');
const {addMembers, deleteMember} = require('../../controllers/members-controller');
const {StateEnum} = require("../../utils/constants");

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

const addItineraryToUser = async (userID, itineraryID) => {
    const userDocID = await userStore.where('userID', '==', userID).get().then(query => query.docs[0].id);
    const itinerary = {
        [itineraryID]: {
            location: 'Kandy',
            state: StateEnum.INACTIVE
        }
    };
    await userStore.doc(userDocID).update({
        itineraries: itinerary
    });
}

describe('Adding a new member', function () {
    beforeAll(async () => {
        init();
        USER_ID = 'add-member'
        USER_ID2 = 'add-member2'
        await userStore.add({
            displayName: 'Kumar Sangakkara',
            email: 'sangaadd@test.com',
            userID: USER_ID,
            preferences: [0, 0, 0, 0, 0],
            isDeleted: 0,
            itineraries: {}
        });
        await userStore.add({
            displayName: 'Mahela Jayawardena',
            email: 'mahela@test.com',
            userID: USER_ID2,
            preferences: [0, 0, 0, 0, 0],
            isDeleted: 0,
            itineraries: {}
        });
    });

    afterAll(async () => {
        const doc = await userStore.where('userID', 'in', [USER_ID, USER_ID2]).get();
        doc.forEach(element => {
            element.ref.delete();
            console.log(`deleted: ${element.id}`);
        });
    });


    //Update the itinerary document
    it('should update the itinerary document', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock({members: [USER_ID]})).then(result => result.path.split('/')[1]);
        await addItineraryToUser(USER_ID, itKandyID);

        const result = await addMembers(generateReqMock({
            user: USER_ID,
            userID: USER_ID,
            itineraryID: itKandyID,
            body: ['mahela@test.com']
        }), res);

        try {
            expect(result).toBeTruthy();

            //Checking the firestore database
            const dbResult = await itineraryStore.doc(itKandyID).get();
            const itinerary = dbResult.data()
            expect(itinerary.members).toContain(USER_ID2);
            expect(itinerary.memberInfo).toHaveProperty(USER_ID2);
            expectPropertyInArray([itinerary.memberInfo], {
                [USER_ID2]: {
                    displayName: 'Mahela Jayawardena',
                    accepted: false,
                    review: 0
                }
            })
        } finally {
            await removeItinerary(itKandyID);
        }
    });

    //Updates the user document
    it('should update the user document', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock({members: [USER_ID]})).then(result => result.path.split('/')[1]);
        await addItineraryToUser(USER_ID, itKandyID);

        const result = await addMembers(generateReqMock({
            user: USER_ID,
            userID: USER_ID,
            itineraryID: itKandyID,
            body: ['mahela@test.com']
        }), res);

        try {
            expect(result).toBeTruthy();

            //Checking the firestore database
            const dbResult = await userStore.where('userID', '==', USER_ID2).get();
            const itinerary = dbResult.docs[0].data()
            expect(itinerary.itineraries).toHaveProperty(itKandyID);
            expectPropertyInArray([itinerary.itineraries], {
                [itKandyID]: {
                    location: 'Kandy',
                    state: StateEnum.INACTIVE
                }
            })
        } finally {
            await removeItinerary(itKandyID);
        }
    });

    //Check if the user is already a member
    it('should return an error if the user is already a member', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock({members: [USER_ID]})).then(result => result.path.split('/')[1]);
        await addItineraryToUser(USER_ID, itKandyID);

        const result = await addMembers(generateReqMock({
            user: USER_ID,
            userID: USER_ID,
            itineraryID: itKandyID,
            body: ['sangaadd@test.com']
        }), res);

        try {
            expect(result.message).toMatch(/already a member/);
        } finally {
            await removeItinerary(itKandyID);
        }
    });


    //Given member does not have a user document
    it('should return an error if given user does not have a user document', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock({members: [USER_ID]})).then(result => result.path.split('/')[1]);
        await addItineraryToUser(USER_ID, itKandyID);

        const result = await addMembers(generateReqMock({
            user: USER_ID,
            userID: USER_ID,
            itineraryID: itKandyID,
            body: [{x: 'Angelo Mathews'}]
        }), res);

        try {
            expect(result.message).toMatch(/not found/);
        } finally {
            await removeItinerary(itKandyID);
        }
    });

    //Cannot access other users' resources
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock()).then(result => result.path.split('/')[1]);

        const result = await addMembers(generateReqMock({user: 'j', params: {itineraryID: itKandyID}}), res);
        expect(result.message).toMatch(/not authorized/);

        await removeItinerary(itKandyID);
    });

    //Document not found
    it('should return an error if there is no document', async function () {
        const result = await addMembers(generateReqMock({params: {itineraryID: 'z'}}), res);
        expect(result.message).toMatch(/not found/);
    });

});

describe('Removing a member', function () {
    beforeAll(async () => {
        init();
        USER_ID = 'add-member'
        USER_ID2 = 'add-member2'
        await userStore.add({
            displayName: 'Kumar Sangakkara',
            email: 'sangaadd@test.com',
            userID: USER_ID,
            preferences: [0, 0, 0, 0, 0],
            isDeleted: 0,
            itineraries: {}
        });
        await userStore.add({
            displayName: 'Mahela Jayawardena',
            email: 'mahela@test.com',
            userID: USER_ID2,
            preferences: [0, 0, 0, 0, 0],
            isDeleted: 0,
            itineraries: {}
        });
    });

    afterAll(async () => {
        const doc = await userStore.where('userID', 'in', [USER_ID, USER_ID2]).get();
        doc.forEach(element => {
            element.ref.delete();
            console.log(`deleted: ${element.id}`);
        });
    });

    //Update the itinerary document
    it('should update the itinerary document', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock({members: [USER_ID, USER_ID2]})).then(result => result.path.split('/')[1]);

        //Add the above itinerary to both the users
        await addItineraryToUser(USER_ID, itKandyID);
        await addItineraryToUser(USER_ID2, itKandyID);

        const result = await deleteMember(generateReqMock({
            userID: USER_ID2,
            user: USER_ID2,
            itineraryID: itKandyID,
            memberID: USER_ID
        }), res);

        try {
            expect(result.results).toBeTruthy();

            //Checking the firestore database
            const dbResult = await itineraryStore.doc(itKandyID).get();
            const itinerary = dbResult.data()
            expect(itinerary.members).not.toContain(USER_ID);
            expect(itinerary.memberInfo).not.toHaveProperty(USER_ID);
        } finally {
            await removeItinerary(itKandyID);
        }
    });

    //Updates the user document
    it('should update the user document', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock({members: [USER_ID]})).then(result => result.path.split('/')[1]);

        //Add the above itinerary to both the users
        await addItineraryToUser(USER_ID, itKandyID);
        await addItineraryToUser(USER_ID2, itKandyID);

        const result = await deleteMember(generateReqMock({
            userID: USER_ID,
            user: USER_ID,
            itineraryID: itKandyID,
            memberID: USER_ID2
        }), res);

        try {
            expect(result).toBeTruthy();

            //Checking the firestore database
            const dbResult = await userStore.where('userID', '==', USER_ID2).get();
            const itinerary = dbResult.docs[0].data()
            expect(itinerary.itineraries).not.toHaveProperty(itKandyID);
        } finally {
            await removeItinerary(itKandyID);
        }
    });

    //Given user is not a member of the itinerary
    it('should return an error if the user being deleted is not a member', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock({members: [USER_ID]})).then(result => result.path.split('/')[1]);

        //Add the above itinerary to both the users
        await addItineraryToUser(USER_ID, itKandyID);

        const result = await deleteMember(generateReqMock({
            userID: USER_ID,
            user: USER_ID,
            itineraryID: itKandyID,
            memberID: USER_ID2
        }), res);

        try {
            expect(result.message).toMatch(/not a member/);
        } finally {
            await removeItinerary(itKandyID);
        }
    })

    //Cannot access other users' resources
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const itKandyID = await itineraryStore.add(generateItineraryMock()).then(result => result.path.split('/')[1]);

        const result = await deleteMember(generateReqMock({user: 'j', itineraryID: itKandyID}), res);
        expect(result.message).toMatch(/not authorized/);

        await removeItinerary(itKandyID);
    });

    //Document not found
    it('should return an error if there is no document', async function () {
        const result = await deleteMember(generateReqMock({params: {itineraryID: 'z'}}), res);
        expect(result.message).toMatch(/not found/);
    });
});
