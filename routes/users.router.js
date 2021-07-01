const router = require('express').Router();

const { controllers } = require('../controllers');
const { userMiddleware } = require('../middleware');

router.get('/', userMiddleware.checkIsNotEmpty, controllers.getAllUsers);
router.post('/', userMiddleware.checkValid, controllers.createUser);
router.get('/:id', userMiddleware.checkIsPresent, controllers.getUserById);
router.delete('/:id', userMiddleware.checkIsPresent, controllers.deleteUserByLogin);
router.put('/:id', userMiddleware.checkIsPresent, userMiddleware.checkValid, controllers.updateUserByLogin);
router.post('/auth', userMiddleware.checkedPasswordAuth, controllers.auth);

module.exports = router;
