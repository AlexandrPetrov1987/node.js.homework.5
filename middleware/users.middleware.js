const { responseCodes, usersConst } = require('../const');
const { User } = require('../dataBase');
const { ErrorHandler } = require('../error');
const {
    RECORD_NOT_FOUND_BY_ID, ERROR_EMAIL_CONFLICT, WRONG_PASSWORD, ERROR_LOGIN_CONFLICT
} = require('../error/error-messages');
const { validator } = require('../validators/index');

module.exports = {
    checkIsNotEmpty: async (req, res, next) => {
        try {
            const users = await User.find({});

            if (!users.length) {
                req.message = usersConst.DATABASE_IS_EMPTY;
            }

            req.users = users;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsPresent: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userById = await User.findById(id);

            if (!userById) {
                throw new ErrorHandler(responseCodes.BAD_REQUEST, RECORD_NOT_FOUND_BY_ID.massage, RECORD_NOT_FOUND_BY_ID.code);
            }

            req.user = userById;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkValidCreate: async (req, res, next) => {
        try {
            const { login, email } = req.body;
            const { error } = validator.createUser.validate(req.body);
            const emailDb = await User.findOne({ email });
            const loginDb = await User.findOne({ login });

            if (error) {
                throw new ErrorHandler(responseCodes.BAD_REQUEST, error.details[0].message, WRONG_PASSWORD.code);
            }

            if (emailDb) {
                throw new ErrorHandler(responseCodes.CONFLICT, ERROR_EMAIL_CONFLICT.massage, ERROR_EMAIL_CONFLICT.code);
            }

            if (loginDb) {
                throw new ErrorHandler(responseCodes.CONFLICT, ERROR_LOGIN_CONFLICT.massage, ERROR_LOGIN_CONFLICT.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkValidUpdate: async (req, res, next) => {
        try {
            const { login, email } = req.body;
            const emailDb = await User.findOne({ email });
            const loginDb = await User.findOne({ login });
            const { error } = validator.updateUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(responseCodes.BAD_REQUEST, error.details[0].message, WRONG_PASSWORD.code);
            }

            if (emailDb) {
                throw new ErrorHandler(responseCodes.CONFLICT, ERROR_EMAIL_CONFLICT.massage, ERROR_EMAIL_CONFLICT.code);
            }

            if (loginDb) {
                throw new ErrorHandler(responseCodes.CONFLICT, ERROR_LOGIN_CONFLICT.massage, ERROR_LOGIN_CONFLICT.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};
