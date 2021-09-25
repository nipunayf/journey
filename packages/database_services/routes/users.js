const router = require('express').Router();
const auth = require('../middleware/auth');
const {getUser,
    addUser,
    updateUser,
    deleteUser} = require('../controllers/users-controller');

router.get('/:userID',
    auth,
    getUser);

router.post('/',
    auth,
    addUser);

router.put('/:userID',
    auth,
    updateUser);

router.delete('/:userID',
    auth,
    deleteUser);


module.exports = router;
