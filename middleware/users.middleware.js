const { responseCodes, usersConst } = require('../const');
const { User } = require('../dataBase');
const { ErrorHandler } = require('../error');
const {
    RECORD_NOT_FOUND_BY_ID, ERROR_EMAIL_CONFLICT, FIELDS_ARE_EMPTY_ERR, WRONG_PASSWORD, ERROR_LOGIN_CONFLICT
} = require('../error/error-messages');
const { passwordHasher } = require('../helpers');
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

    checkValid: async (req, res, next) => {
        try {
            const { login, password, email } = req.body;
            const emailDb = await User.findOne({ email });
            const loginDb = await User.findOne({ login });
            const { error } = validator.createUser.validate(req.body);

            if (!(login || password || email)) {
                throw new ErrorHandler(responseCodes.CONFLICT, FIELDS_ARE_EMPTY_ERR.massage, FIELDS_ARE_EMPTY_ERR.code);
            }
            if (error) {
                throw new ErrorHandler(responseCodes.BAD_REQUEST, error.details[0].message, WRONG_PASSWORD.code);
            }
            if (emailDb) {
                throw new ErrorHandler(responseCodes.CONFLICT, ERROR_EMAIL_CONFLICT.massage, ERROR_EMAIL_CONFLICT.code);
            } if (loginDb) {
                throw new ErrorHandler(responseCodes.CONFLICT, ERROR_LOGIN_CONFLICT.massage, ERROR_LOGIN_CONFLICT.code);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkedPasswordAuth: async (req, res, next) => {
        try {
            const { password, email } = req.body;
            const userByEmail = await User.findOne({ email }).select('+password');

            if (!(password || email)) {
                throw new ErrorHandler(responseCodes.CONFLICT, FIELDS_ARE_EMPTY_ERR.massage, FIELDS_ARE_EMPTY_ERR.code);
            }
            if (!userByEmail) {
                throw new ErrorHandler(responseCodes.WRONG_EMAIL_OR_PASSWORD, WRONG_PASSWORD.message,
                    WRONG_PASSWORD.code);
            }
            await passwordHasher.compare(userByEmail.password, password);

            req.userByEmail = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    }
};
