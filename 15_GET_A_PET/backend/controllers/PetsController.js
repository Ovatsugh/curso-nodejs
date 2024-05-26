const Pet = require('../models/Pet')
const getToken = require('../helpers/get-token')
const userBytoken = require('../helpers/get-user-by-token')
const { findById } = require('../models/User')
const objectId = require('mongoose').Types.ObjectId

module.exports = class PetsController {
    static async create(req, res) {
        const { name, age, weight, color } = req.body
        const images = req.files

        const available = true

        //images upload

        //validation
        if (!name) return res.status(422).json({ message: 'O nome é obrigatório' })
        if (!age) return res.status(422).json({ message: 'A idade é obrigatório' })
        if (!weight) return res.status(422).json({ message: 'O peso é obrigatório' })
        if (!color) return res.status(422).json({ message: 'A cor  é obrigatória' })
        if (images.length === 0) return res.status(422).json({ message: 'A imagem é obrigatória' })

        //get pet owner
        const token = await getToken(req)
        const user = await userBytoken(token)



        //create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((imgs) => {
            pet.images.push(imgs.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({
                message: "Pet cadastrado com sucesso",
                pet: newPet
            })

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async getAll(req, res) {

        try {
            const pets = await Pet.find().sort('createdAt')
            res.status(200).json({ pets: pets })
        } catch (error) {

            res.status(500).json({ message: error })
        }

    }

    static async getAllUserPets(req, res) {
        const token = await getToken(req)
        const user = await userBytoken(token)

        const pets = await Pet.find({ 'user._id': user._id }).sort('createdAt')

        res.status(200).json({ pets })

    }


    static async getAllUserAdoptions(req, res) {
        const token = await getToken(req)
        const user = await userBytoken(token)

        try {
            const pets = await Pet.find({ 'adopter._id': user._id }).sort('createdAt')
            res.status(200).json({ pets })

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async getPetById(req, res) {

        const id = req.params.id



        // check if id is valid
        if (!objectId.isValid(id)) {
            return res.status(422).json({ message: 'ID inválido!' })
        }

        // check if pet existss
        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado!' })
        }

        return res.status(200).json({ pet: pet })

    }

    static async removePetById(req, res) {
        const id = req.params.id
        const token = await getToken(req)
        const user = await userBytoken(token)

        // check if id is valid
        if (!objectId.isValid(id)) {
            return res.status(422).json({ message: 'ID inválido!' })
        }

        // check if pet exists
        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado!' })
        }

        //check if logged in user registred the pet

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({ message: 'Houve um problema em processa a sua solicitação!' })
        }

        //delete pet

        try {
            await Pet.findByIdAndDelete(id)
            res.status(201).json({
                message: "Pet deletado com sucesso"
            })

        } catch (error) {
            res.status(500).json({ message: error })
        }


    }

    static async updatePet(req, res) {
        const id = req.params.id
        const { name, age, weight, color, available } = req.body
        const images = req.files
        const token = await getToken(req)
        const user = await userBytoken(token)

        //validations
        if (!name) return res.status(422).json({ message: 'O nome é obrigatório' })
        if (!age) return res.status(422).json({ message: 'A idade é obrigatório' })
        if (!weight) return res.status(422).json({ message: 'O peso é obrigatório' })
        if (!color) return res.status(422).json({ message: 'A cor  é obrigatória' })
        // if (images.length > 0) return res.status(422).json({ message: 'A imagem é obrigatória' })
        //check if pet exists 
        const pet = await Pet.findById(id)

        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado!' })
        }
        if (pet.user._id.toString() !== user._id.toString()) return res.status(422).json({ message: 'Houve um problema em processa a sua solicitação!' })

        //set values
        const updateData = {}
        updateData.name = name
        updateData.age = age
        updateData.weight = weight
        updateData.color = color
        updateData.images = []

        if (images.length > 0) {

            images.map((img) => {
                updateData.images.push(img.filename)
            })


        }

        try {
            await Pet.findByIdAndUpdate(id, updateData)
            res.status(200).json({ message: 'Pet atualizado com sucesso' })

        } catch (error) {

            res.status(500).json({ message: error })
        }

    }

    static async schedule(req, res) {
        const id = req.params.id
        const token = await getToken(req)
        const user = await userBytoken(token)

        //check if pet exists
        const pet = await Pet.findById(id)

        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado!' })
        }
        if (pet.user._id.equals(user._id)) return res.status(422).json({ message: 'Você não pode agendar visita com o propio pet!' })

        if (pet.adopter) {
            if (pet.adopter._id.equals(user._id)) {
                return res.status(422).json({ message: 'Você já agendou uma visita para esse pet pet!' })

            }
        }

        //add user to   pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({ message: `A visita foi agendada com sucesso, entre em contado com ${pet.user.name}, pelo telefone ${pet.user.phone}` })

    }

    static async concludeAdoption(req, res) {
        const id = req.params.id
        let pet = {}
        const token = await getToken(req)
        const user = await userBytoken(token)

        // check if pet exists
        try {
            const petDate = await Pet.findById(id)
            pet = petDate

        } catch (error) {
            return res.status(404).json({ message: 'Pet não encontrado!' })
        }

        if (pet.user._id.toString() !== user._id.toString()) return res.status(422).json({ message: 'Houve um problema em processa a sua solicitação!' })

        pet.available = false
        await Pet.findByIdAndUpdate(id, pet)
        res.status(200).json({ message: "Parabéns, o ciclo de adoção foi finalizado com sucesso" })
    }

}



