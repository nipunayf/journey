var admin = require("firebase-admin");

var serviceAccount = require("./firebase_secret.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = {
    userStore: admin.app().firestore().collection('users'),
    itineraryStore: admin.app().firestore().collection('itineraries'),
    auth: admin.app().auth()
};





