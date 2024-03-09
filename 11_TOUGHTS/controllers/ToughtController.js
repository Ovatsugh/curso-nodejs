const Tought = require('../models/Tought')
const User = require('../models/User')
const { Op } = require('sequelize')


module.exports = class ToughtController {
    static async showToughts(req, res) {


        let search = ''

        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }


        const tought = await Tought.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%` }
            },
            order: [['createdAt', order]]
        })
        const toughts = tought.map((res) => res.get({ plain: true }))
        let toughtsQty = toughts.length
        if (toughtsQty === 0) {
            toughtsQty = false
        }


        res.render('toughts/home', { toughts, search, toughtsQty })

    }

    static async dashboard(req, res) {
        const userId = req.session.userid
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Tought,
            plain: true
        })

        if (!user) {
            res.redirect('/login')
            return
        }


        let emptyToughts = false
        const toughts = user.Toughts.map((res) => res.dataValues)

        if (toughts.length === 0) {
            emptyToughts = true
        }

        res.render('toughts/dashboard', { toughts, emptyToughts })

    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtSave(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Tought.create(tought)
            req.flash('message', 'Pensamento cadastrado com sucesso')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log('aconteceu um erro' + error)
        }
    }


    static async deleteTought(req, res) {
        const id = req.body.id
        const userId = req.session.userid
        try {
            await Tought.destroy({
                where: {
                    id: id,
                    UserId: userId
                }
            })
        } catch (err) {
            console.log('aconteceu um erro ' + err)
        }
        req.flash('message', 'Pensamento removido com sucesso')
        req.session.save(() => {
            res.redirect('/toughts/dashboard')
        })
    }

    static async editTought(req, res) {
        const userId = req.session.userid
        const id = req.params.id
        const tought = await Tought.findOne({
            where: { id: id },
            raw: true
        })

        if (tought.UserId != userId) {
            res.redirect('/toughts/dashboard')
            return
        }

        res.render('toughts/edit', { tought })

    }

    static async editToughtSave(req, res) {

        const { id, title } = req.body
        try {
            await Tought.update({ title }, {
                where: {
                    id: id
                }
            })
            req.flash('message', 'Pensamento editado com sucesso')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log('Aconteceu algum erro ' + error)
        }
    }




} 