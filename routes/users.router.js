const router = require('express').Router();

const { controllers } = require('../controllers');
const { userMiddleware } = require('../middleware');

router.get('/', userMiddleware.checkIsNotEmpty, controllers.getAllUsers);
router.get('/:id', userMiddleware.checkIsPresent, controllers.getUserById);
router.post('/', userMiddleware.checkValid, controllers.createUser);
router.delete('/:id', userMiddleware.checkIsPresent, controllers.deleteUserByLogin);
router.put('/:id', userMiddleware.checkIsPresent, userMiddleware.checkValid, controllers.updateUserByLogin);

module.exports = router;
