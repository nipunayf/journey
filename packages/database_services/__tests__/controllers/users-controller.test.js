const {getUser, addUser, updateUser, deleteUser} = require('../../controllers/users-controller');
const {userStore, itineraryStore} = require('../../config/firebase')
const {successMessage, errorMessage} = require("../../utils/message-template");

const init = () => {
    res = {
        status: () => {
            return {
                send: (output) => {
                    return output
                }
            }
        }
    }
}

describe('Getting an existing user', function () {

    beforeAll(async () => {
        await userStore.add({
            first_name: 'Kumar',
            last_name: 'Sangakkara',
            email: 'sanga@test.com',
            user_id: 'a',
            preferences: [0, 0, 0, 0, 0],
            is_deleted: 0
        })
    });

    beforeEach(() => {
        init()
        req = {
            user: 'a',
            params: {
                userID: 'a'
            }
        }
    })

    afterAll(async () => {
        const doc = await userStore.where('user_id', '==', 'a').get()
        doc.forEach(element => {
            element.ref.delete();
            console.log(`deleted: ${element.id}`);
        });
    })

    //User should be able to get his user document
    it('should return the document of the given user', async function () {
        const user = await getUser(req, res);
        expect(user.results.user_id).toBe('a');
    });

    //User should receive an error if there exists no document
    it('should return an error if there is no document', async function () {
        const user = await getUser({user: 'z', params: {userID: 'z'}}, res);
        expect(user.message).toMatch(/not found/);
    });

    //User should not be able to get a user document of another user
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const user = await getUser({...req, user: 'b'}, res);
        expect(user.message).toMatch(/not authorized/);
    });

    it('should not retrieve a deleted account', async function () {
        await userStore.add({
            first_name: 'Kumar',
            last_name: 'Sangakkara',
            email: 'sanga@test.com',
            user_id: 'z',
            preferences: [0, 0, 0, 0, 0],
            is_deleted: 1
        });
        const user = await getUser({user: 'z', params: {userID: 'z'}}, res);
        const doc = await userStore.where('user_id', '==', 'z').get()
        doc.forEach(element => {
            element.ref.delete();
            console.log(`deleted: ${element.id}`);
        });
        expect(user.message).toMatch(/not found/);
    });
});

describe('Adding a new user', function () {
    beforeEach(() => {
        init()
        req = {
            user: 'b',
            body: {
                first_name: 'Kumar',
                last_name: 'Sangakkara',
                email: 'sanga@test.com',
                user_id: 'b',
                preferences: [0, 0, 0, 0, 0]
            }
        }
    });

    afterAll(async () => {
        const doc = await userStore.where('user_id', '==', 'b').get()
        doc.forEach(element => {
            element.ref.delete();
            console.log(`deleted: ${element.id}`);
        });
    })

    //Must create a new user document
    it('should add a new user document to to the firestore', async function () {
        const result = await addUser(req, res);
        const dbResult = await userStore.where('user_id', '==', 'b').get();
        expect(dbResult.docs[0].data(0).user_id).toBe('b');
        expect.anything(result.results);
    });

    //Cannot add user if he already exists
    it('should return an error if there already exists an user ', async function () {
        await userStore.add({
            first_name: 'Kumar',
            last_name: 'Sangakkara',
            email: 'sanga@test.com',
            user_id: 'b',
            preferences: [0, 0, 0, 0, 0],
            is_deleted: 0
        });
        const result = await addUser(req, res);
        expect(result.message).toMatch(/already exists/)
    });

    //User should not be able to get a user document of another user
    it('should return an error if user attempt to access another user\'s resources', async function () {
        const user = await addUser({...req, user: 'a'}, res);
        expect(user.message).toMatch(/not authorized/);
    });
})
;

describe('Updating an existing user', function () {
    beforeEach(() => {
        init()
        req = {
            user: 'c',
            body: {
                preferences: [0, 0, 1, 0, -1]
            },
            params: {
                userID: 'c'
            }
        }
    });

    beforeAll(async () => {
        await userStore.add({
            first_name: 'Kumar',
            last_name: 'Sangakkara',
            email: 'sanga@test.com',
            user_id: 'c',
            preferences: [0, 0, 0, 0, 0],
            is_deleted: 0
        })
    });

    afterAll(async () => {
        const doc = await userStore.where('user_id', '==', 'c').get()
        doc.forEach(element => {
            element.ref.delete();
            console.log(`deleted: ${element.id}`);
        });
    });

    //Updated user document must reflect in the firestore
    it('should update firestore', async function () {
        const result = await updateUser(req, res);
        const dbResult = await userStore.where('user_id', '==', 'c').get();
        expect(dbResult.docs[0].data(0).preferences).toStrictEqual([0, 0, 1, 0, -1]);
    });

    //User should not be able to update another user's document
    it('should return an error if user attempts to update another user`\s document', async function () {
        const user = await updateUser({...req, user: 'a'}, res);
        expect(user.message).toMatch(/not authorized/);

    });

    //Should return an error if there is no user document
    it('should return an error if there is no document', async function () {
        const user = await updateUser({...req, user: 'z', params: {userID: 'z'}}, res);
        expect(user.message).toMatch(/not found/);
    });

    //Should not allow to change the user id
    it('should return an error if user attemps to update the user ID', async function () {
        const user = await updateUser({...req, body: {user_id: 'x'}}, res);
        expect(user.message).toMatch(/user ID/);
    });
});

describe('Deleting an existing user', function () {
    beforeEach(() => {
        init()
        req = {
            user: 'd',
            params: {
                userID: 'd'
            }
        }
    });

    beforeAll(async () => {
        await userStore.add({
            first_name: 'Kumar',
            last_name: 'Sangakkara',
            email: 'sanga@test.com',
            user_id: 'd',
            preferences: [0, 0, 0, 0, 0],
            is_deleted: 0
        })
    });

    afterAll(async () => {
        const doc = await userStore.where('user_id', '==', 'd').get()
        doc.forEach(element => {
            element.ref.delete();
            console.log(`deleted: ${element.id}`);
        });
    });

    //'isDeleted' must be set to false when user requests to delete his account
    it('should update the is_delete state of the firestore upon delete requrest', async function () {
        const result = await deleteUser(req, res);
        const dbResult = await userStore.where('user_id', '==', 'd').get();
        expect(dbResult.docs[0].data(0).is_deleted).toBe(1);
    });

    //User should not be able to update another user's document
    it('should return an error if user attempts to update another user\`s document', async function () {
        const result = await deleteUser({...req, user: 'a'}, res);
        expect(result.message).toMatch(/not authorized/);
    });

    //Should return an error if there is no user document
    it('should return an error if there is no document', async function () {
        const result = await deleteUser({user: 'z', params: {userID: 'z'}}, res);
        expect(result.message).toMatch(/not found/);
    });
});
