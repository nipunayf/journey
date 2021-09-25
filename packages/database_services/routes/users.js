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
    updateUser);

router.delete('/:userID',
    deleteUser);


module.exports = router;
