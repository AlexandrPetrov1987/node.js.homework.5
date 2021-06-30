const { ErrorHandler } = require('../error');
const {
    RECORD_NOT_FOUND, RECORD_NOT_FOUND_BY_ID, ERROR_EMAIL_CONFLICT, FIELDS_ARE_EMPTY_ERR
} = require('../error/error-messages');
const { responseCodes } = require('../const');
const { User } = require('../dataBase');

module.exports = {
    checkIsNotEmpty: async (req, res, next) => {
        try {
            const users = await User.find({});

            if (!users) {
                throw new ErrorHandler(responseCodes.BAD_REQUEST, RECORD_NOT_FOUND.massage, RECORD_NOT_FOUND.code);
            }
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

    checkValid: async (req, res, next) => {
        try {
            const { login, password, email } = req.body;
            const allUsers = await User.find({});

            if (!(login || password || email)) {
                throw new ErrorHandler(responseCodes.CONFLICT, FIELDS_ARE_EMPTY_ERR.massage, FIELDS_ARE_EMPTY_ERR.code);
            }

            for (const user of allUsers) {
                if (user.email === email) {
                    throw new ErrorHandler(responseCodes.CONFLICT, ERROR_EMAIL_CONFLICT.massage, ERROR_EMAIL_CONFLICT.code);
                }
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
