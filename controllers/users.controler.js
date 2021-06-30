const { User } = require('../dataBase');
const { responseCodes, usersConst } = require('../const');

module.exports = {
    getAllUsers: (req, res, next) => {
        try {
            res.status(responseCodes.SUCCESS).json(req.message || req.users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.status(responseCodes.SUCCESS).json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { body } = req;
            const createdUser = await User.create(body);

            res.status(responseCodes.CREATED_OR_UPDATE).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUserByLogin: async (req, res, next) => {
        try {
            const { user } = req;
            await User.findByIdAndDelete(user._id);

            res.sendStatus(responseCodes.DELETE);
        } catch (e) {
            next(e);
        }
    },

    updateUserByLogin: async (req, res, next) => {
        try {
            const { body, user } = req;
            await User.findByIdAndUpdate(user._id, body);

            res.status(responseCodes.CREATED_OR_UPDATE).json(usersConst.FILE_IS_UPDATE);
        } catch (e) {
            next(e);
        }
    }
};
