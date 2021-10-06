const admin = require("firebase-admin");

const serviceAccount = require("./firebase_secret.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = {
    userStore: admin.app().firestore().collection('users'),
    itineraryStore: admin.app().firestore().collection('itineraries'),
    authenticate: admin.app().auth(),
    transaction: () => admin.app().firestore().batch()
}





