const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const userBytoken = require('../helpers/get-user-by-token')


//helpers
const getToken = require('../helpers/get-token')
const createUserToken = require('../helpers/create-user-tokens')


module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body

        //validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatorio' })
            return
        }
        console.log(name, email, phone, password, confirmpassword)

        if (!email) return res.status(422).json({ message: 'O email é obrigatorio' })
        if (!phone) return res.status(422).json({ message: 'O phone é obrigatorio' })
        if (!password) return res.status(422).json({ message: 'O password é obrigatorio' })
        if (!confirmpassword) return res.status(422).json({ message: 'A confirmação de senha é obrigatorio' })
        if (password !== confirmpassword) return res.status(422).json({ message: 'A senha e a confirmação precisam ser iguais' })

        const userExits = await User.findOne({ email: email })
        if (userExits) return res.status(422).json({ message: 'Esse email já está em uso' })




        // create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()

            await createUserToken(newUser, req, res)


        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        const checkPassword = await bcrypt.compare(password, user.password)


        //validations
        if (!email) return res.status(422).json({ message: 'O email é obrigatorio' })
        if (!password) return res.status(422).json({ message: 'O password é obrigatorio' })
        if (!user) return res.status(422).json({ message: 'Nenhum usuário encontrado com esse email' })

        //check password
        if (!checkPassword) return res.status(422).json({ message: 'Senha inválida' })

        await createUserToken(user, req, res)

    }

    static async chechUser(req, res) {

        let currentUser
        if (req.headers.authorization) {

            const token = await getToken(req)
            const decode = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decode.id)
            currentUser.password = undefined


        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)

    }

    static async getUserById(req, res) {
        const id = req.params.id

        try {
            const user = await User.findById(id).select("-password")
            res.status(200).json({ user })

        } catch (error) {
            return res.status(422).json({ message: 'Usuário não encontrado' })
        }


    }

    static async editUser(req, res) {
        const token = await getToken(req)
        const user = await userBytoken(token)
        const { name, email, phone, password, confirmpassword } = req.body
        let image = ''

        if (req.file) {
            user.image = req.file.filename
        }


        //validations
        if (!name) return res.status(422).json({ message: 'O nome é obrigatorio' })
        if (!email) return res.status(422).json({ message: 'O email é obrigatorio' })
        const userExits = await User.findOne({ email: email })
        if (user.email !== email && userExits) {
            return res.status(422).json({ message: 'Esse email já está em uso' })
        }
        if (!phone) return res.status(422).json({ message: 'O phone é obrigatorio' })
        if (!password) return res.status(422).json({ message: 'O password é obrigatorio' })

        if (!confirmpassword) return res.status(422).json({ message: 'A confirmação de senha é obrigatorio' })
        if (password !== confirmpassword) {
            return res.status(422).json({ message: 'A senha e a confirmação precisam ser iguais' })
        } else if (password === confirmpassword && password != null) {

            //create a new password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.passwordHash = password

        }



        //set
        user.name = name
        user.email = email
        user.phone = phone

        try {
            //return update data

            await User.findOneAndUpdate(
                { _id: user.id },
                { $set: user },
                { new: true }
            )
            res.status(200).json({
                message: "Usuário atualizado com sucesso"
            })
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }
}
