const { AuthorsService } = require('../services')
const { ControllerHelper } = require('../helpers/')
class AuthorsController extends ControllerHelper {
    async index (req, res) 
    {
        const { page, perPage, sortBy } = req.query
        const authors = await AuthorsService.fetchAllAuthors(sortBy);
        const paginated = super.paginate(authors, page, perPage)
        return res.status(200).json({data: paginated});
    }
    async create(req, res)
    {
        const { name, age } =req.body
        const data = { name, age }
        
        const author = await AuthorsService.createAuthor(data)
        console.log(author)
        return res.status(201).json({data: author})
    }
    async listBooks(req, res)
    {
        const { page, perPage, sortBy } = req.query
        const authorsWithBooks = await AuthorsService.getAuthorsWithBook(sortBy)
        const paginated = super.paginate(authorsWithBooks, page, perPage)
        return res.status(200).json({data:paginated})
    }
    async authorBooks(req, res)
    {
        const { id } = req.params
        const authorBooks = await AuthorsService.getAuthorBooksById(id)
        return res.status(200).json({data:authorBooks})
    }
    async show(req, res)
    {
        const { id } = req.params
        const author = await AuthorsService.getAuthorById(id)
        return res.status(200).json({data: author})
    }
}

module.exports = new AuthorsController