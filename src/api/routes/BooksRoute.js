const router = require('express').Router()
const BooksController = require('../controllers/BooksController')
const { rules, validate } = require('../validators/BookValidator')
const { BooksRequest } = require('../validators/')

router.get('/',BooksController.index)
router.get('/authors', BooksController.booksWithAuthor)
router.get('/:id', BooksController.show)
router.get('/author/:id', BooksController.showBookWithAuthor)
router.post('/',BooksRequest.CreateRequest, BooksController.create)
router.patch('/:id',rules('update'),validate ,BooksController.update)
router.delete('/:id',rules('delete'),validate ,BooksController.delete)
module.exports = router