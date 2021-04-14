const mongoose = require('mongoose');
const createError = require("http-errors");
const User = require('../models/User.model');
const { authSchema } = require('../helpers/validation_schema');

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await authSchema.validateAsync(req.body);

        const doesExited = await User.findOne({email: result.email});
        if (doesExited) {
            throw createError.Conflict(`Email: ${email} is already registered`);
        }
        const user = new User(result);
        const savedUser = await user.save();

        res.send(savedUser);

    } catch (error) {
        if (error.isJoi) {
            error.status = 422;
        }
        next(error);
    }
};