const express = require('express');

const {RECORD_NOT_FOUND} = require('./error/error-messages');
const mongoose = require('mongoose');
const { usersRouter } = require('./routes');
const { usersConst, responseCodes } = require('./const');

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
            message: err.message || usersConst.UNKNOWN_ERROR,
            customCode: err.code || responseCodes.UNKNOWN_ERROR
        });
}

function _notFoundHandler(req, res, next) {
    next({
        status: responseCodes.BAD_REQUEST,
        message: RECORD_NOT_FOUND.massage,
        code: RECORD_NOT_FOUND.code
    });
}

function _mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });
}
