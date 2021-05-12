const router = require('express').Router();
const controllers = require('./user.controllers');

router.get('/', controllers.getUsers);

router.get('/:userId', controllers.getUserById);

router.post('/', controllers.createUser);

router.put('/:userId', controllers.updateUser);

router.delete('/:userId', controllers.deleteUser);

module.exports = router;
