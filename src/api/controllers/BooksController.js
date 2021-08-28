const { BooksService } = require('../services')
const { ControllerHelper } = require('../helpers/')
class BooksController extends ControllerHelper
{
    async index (req, res) 
    {
        const { page, perPage, sortBy } = req.query
        const books = await BooksService.fetchAllBooks(sortBy)
        const paginated = super.paginate(books, page, perPage)
        return res.status(200).json({ data: paginated })
    }
    async create(req, res)
    {
        const book = await BooksService.createBook(req.data)
        return res.status(201).json({data: book})
    }
    async booksWithAuthor(req, res)
    {
        const { page, size, sortBy } = req.query
        const books = await BooksService.fetchAllBooksWithAuthor()
        const paginated = await super.paginate(books, page, size)
        return res.status(200).json({data: paginated})
    }
    async show(req, res)
    {
        const { id } = req.params
        const book = await BooksService.getBookById(id)
        if(!book){
            return res.status(404).json({ message: "No book found" })
        }
        return res.status(200).json({data: book})
    }
    async update(req, res)
    {
        const { title, date_published } =req.body
        const { id } = req.params
        const data = { title, date_published }
        const book = await BooksService.updateBook(id, data)
        return res.status(200).json({ message: "Book successfully updated" })
    }
    async delete(req, res)
    {
        const { id } = req.params
        const book = await BooksService.deleteBook(id)
        return res.status(200).json({ message: "Book is now deleted" })
    }
    async showBookWithAuthor(req,res)
    {
        const { id } = req.params
        const book = await BooksService.getBookWithAuthorById(id)
        return res.status(200).json({data: book})
    }
}

module.exports = new BooksController