const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { imgUpload } = require('../helpers/image-upload')

//middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.chechUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', 
verifyToken, 
imgUpload.single('image'), 
UserController.editUser,
)

module.exports = router