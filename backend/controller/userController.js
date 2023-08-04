const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const createToken = (_id) => {

    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        //create token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)

        console.log({ user: user, token: token })

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser }