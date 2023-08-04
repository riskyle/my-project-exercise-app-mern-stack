const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

//static signup
userSchema.statics.signup = async function (email, password) {
    if (!email || !password) throw Error('All fields must be filled.')

    if (!validator.isEmail(email)) throw Error('Email is not valid.')

    if (!validator.isStrongPassword(password)) throw Error('Password is Weak.')

    const exist = await this.findOne({ email });
    if (exist) {
        throw Error("Email is already used.");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });

    return user;
}

//static login
userSchema.statics.login = async function (email, password) {
    if (!email || !password) throw Error('All feild must be filled.')

    const user = await this.findOne({ email })

    if (!user) throw Error('Incorrect email.')

    const userInputPassword = password;
    const storedHashPassword = user.password;

    const match = await bcrypt.compare(userInputPassword, storedHashPassword);

    if (!match) throw Error('Incorrect Password');

    return user;
}

const User = mongoose.model('users', userSchema)

module.exports = User;