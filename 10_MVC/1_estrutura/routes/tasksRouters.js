const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/Task')

router.get('/add', TaskController.createTask)
router.post('/add', TaskController.createTaskSave)
router.post('/delete', TaskController.deleteTask)
router.post('/edit', TaskController.updateTask)
router.get('/edit/:id', TaskController.editTask)
router.post('/update', TaskController.toggleTaskStatus)
router.get('/', TaskController.showTask)




module.exports = router