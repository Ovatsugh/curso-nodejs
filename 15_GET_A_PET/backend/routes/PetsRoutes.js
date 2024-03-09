const router = require('express').Router()
const PetsController = require('../controllers/PetsController')

//middlewares
const verifyToken = require('../helpers/verify-token')
const { imgUpload } = require('../helpers/image-upload')

router.post('/create', imgUpload.array('images'), verifyToken, PetsController.create)
router.get('/', PetsController.getAll)
router.get('/mypets', verifyToken, PetsController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetsController.getAllUserAdoptions)
router.get('/:id', PetsController.getPetById)
router.delete('/:id', verifyToken, PetsController.removePetById)
router.patch('/:id', imgUpload.array('images'), verifyToken, PetsController.updatePet)
router.patch('/schedule/:id', verifyToken, PetsController.schedule)
router.patch('/conclude/:id', verifyToken, PetsController.concludeAdoption)

module.exports = router