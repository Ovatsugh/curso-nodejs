const jwt = require('jsonwebtoken')

const User = require('../models/User')

//get user by jwwt token

const getUserByToken = async (token) => {
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }
    const decode = jwt.verify(token, 'nossosecret')
    const id = decode.id

    const user = await User.findById(id)

    return user

}

module.exports = getUserByToken