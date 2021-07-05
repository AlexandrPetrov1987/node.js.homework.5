const router = require('express').Router();

const { controllers } = require('../controllers');
const { userMiddleware } = require('../middleware');

router.get('/', userMiddleware.checkIsNotEmpty, controllers.getAllUsers);
router.post('/', userMiddleware.checkValidCreate, controllers.createUser);
router.get('/:id', userMiddleware.checkIsPresent, controllers.getUserById);
router.delete('/:id', userMiddleware.checkIsPresent, controllers.deleteUserByLogin);
router.put('/:id', userMiddleware.checkIsPresent, userMiddleware.checkValidUpdate, controllers.updateUserByLogin);

module.exports = router;
