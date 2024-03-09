const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')
//helper
const chechAuth = require('../helpers/auth').chechAuth

router.get('/add', chechAuth, ToughtController.createTought) 
router.post('/add', chechAuth, ToughtController.createToughtSave) 
router.post('/delete', chechAuth, ToughtController.deleteTought) 
router.get('/edit/:id', chechAuth, ToughtController.editTought) 
router.post('/edit', chechAuth, ToughtController.editToughtSave) 
router.get('/dashboard', chechAuth, ToughtController.dashboard) 
router.get('/', ToughtController.showToughts) 

module.exports = router