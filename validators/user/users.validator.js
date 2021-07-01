const Joi = require('joi');

const { usersRolesEnum } = require('../../const');

const { regexp } = require('../../const');

module.exports = {
    createUser: Joi.object().keys({
        login: Joi.string().required().min(3).max(20),
        email: Joi.string().regex(regexp.EMAIL_REGEXP),
        password: Joi.string().regex(regexp.PASSWORD_REGEXP),
        role: Joi.string().allow(...Object.values(usersRolesEnum))
    })
};
