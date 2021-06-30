const bcrypt = require("bcryptjs")

const User = require("../models/userModel")

exports.signUp = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username,
            password: hashPassword
        })
        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            } 
        })
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({
            username
        })
        const isCorrect = await bcrypt.compare(password, user?.password ?? '')
        if (isCorrect) {
            res.status(200).json({
                status: "success"
            })
        } else {
            res.status(400).json({
                status: "fail",
                message: "incorrect username or password"
            })
        }
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}