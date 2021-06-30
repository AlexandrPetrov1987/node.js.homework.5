const { Schema, model } = require('mongoose');

const { usersRolesEnum } = require('../const');

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        max: 25
    },
    password: {
        type: String,
        required: true,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: Object.values(usersRolesEnum),
        default: usersRolesEnum.USER
    },
}, { timestamps: true });

module.exports = model(usersRolesEnum.USER, userSchema);
