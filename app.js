const express = require('express');

const mongoose = require('mongoose');
const { usersRouter } = require('./routes');
const { usersConst } = require('./const');
// const ErrorH = require('./error/errorHandler');

const app = express();
_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(usersConst.PORT, () => {
    console.log('app listen 3000');
});

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
    res
        .status(err.status)
        .json({
        message: err.message || 'Unknown error',
        customCode: err.code || 0
    });
}

function _notFoundHandler(req, res, next) {
    next({
        status: 404,
        message: 'Route not found'
    });
}

function _mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });
}
