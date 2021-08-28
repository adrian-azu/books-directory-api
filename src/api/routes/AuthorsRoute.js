const router = require('express').Router()
const AuthorsController = require('../controllers/AuthorsController')
const { rules, validate } = require('../validators/BookValidator')
router.get('/',AuthorsController.index)
router.post('/', AuthorsController.create)
router.get('/:id',AuthorsController.show)
router.get('/books',AuthorsController.listBooks)
router.get('/books/:id',AuthorsController.authorBooks)
module.exports = router