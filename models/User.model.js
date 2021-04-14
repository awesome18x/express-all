const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(this.password, salt);
        this.password  = hasedPassword;
        next();
    } catch(error) {
        console.log(error);
        next(error);
    }
})

userSchema.post('save', async function (next){
    try {
        console.log('Called after save');
    } catch(error) {
        console.log(error);
        next(error);
    }
})


module.exports = mongoose.model('User', userSchema);