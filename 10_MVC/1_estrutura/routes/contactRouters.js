const express = require('express')
const router = express.Router()

const ContactController = require('../controllers/Contact')

router.get('/', ContactController.showContact)



module.exports = router