const { responseCodes } = require('../const');
const { User } = require('../dataBase');
const { ErrorHandler } = require('../error');
const { WRONG_PASSWORD } = require('../error/error-messages');
const { passwordHasher } = require('../helpers');
const { validatorAuth } = require('../validators/index');

module.exports = {

    checkedPasswordAuth: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userByEmail = await User.findOne({ email }).select('+password');
            const { error } = validatorAuth.authUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(responseCodes.BAD_REQUEST, error.details[0].message, WRONG_PASSWORD.code);
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
}