const Task = require('../models/Task')

module.exports = class Controller {
    static createTask(req, res) {
        res.render('tasks/create')
    }

    static async showTask(req, res) {
        const Tasks = await Task.findAll({ raw: true })
        res.render('tasks/all', { Tasks })
    }

    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: '1'
        }

        await Task.create(task)
        res.redirect('/tasks')

    }

    static async deleteTask(req, res) {
        const id = req.body.id
        await Task.destroy({ where: { id: id } })
        res.redirect('/tasks')
    }

    static async editTask(req, res) {
        const id = req.params.id
        const data = await Task.findOne({ raw: true ,where: { id: id } })
        console.log(data)
        res.render('tasks/edit', { data })
    }

    static async updateTask(req, res) {
        const id = req.body.id
        const title = req.body.title
        const description = req.body.description
        console.log(req.body)
        Task.update({id, title, description}, {where: {id:id}})
        res.redirect('/tasks')
    }

    static async toggleTaskStatus(req, res) {
        const id = req.body.id

        const task = {
            done: req.body.done === '0' ? true: false
        }
        console.log(task)

        await Task.update(task, {where: {id: id}})
        res.redirect('/tasks')
    }
}