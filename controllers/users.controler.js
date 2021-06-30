
const { User } = require('../dataBase');
const { responseCodes, usersConst } = require('../const');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.status(responseCodes.SUCCESS).json(users);
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

    deleteUserByLogin: async (req, res,next) => {
        try {
            const { user } = req;
            await User.findByIdAndDelete(user._id);

            res.status(responseCodes.DELETE).json(usersConst.DELETE_STATUS_SUCCESS);
        } catch (e) {
            next(e);
        }
    },

    // updateUserByLogin: async (req, res,next) => {
    //     try {
    //         const { body, user } = req;
    //         await usersServices.updateUser(user, body);
    //
    //         res.json(responseCodes.CREATED);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
};
