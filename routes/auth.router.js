const routerAuth = require('express').Router();

const { controllersAuth } = require('../controllers');
const { authMiddleware } = require('../middleware');

routerAuth.post('/auth', authMiddleware.checkedPasswordAuth, controllersAuth.auth);

module.exports = routerAuth;
