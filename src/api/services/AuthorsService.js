const mongoose = require('mongoose')
const { Author } = require('../models');

class AuthorsService {
    async getAuthorsInfo() 
    {
        try {
            const authors = await Author.find()
            return authors;
        } catch (error) {
            throw new Error('An error while fetching the author data')
            console.log(error)
        }
    }
    async getAuthorById(id) 
    {
        try {
            const authors = await Author.find({ '_id': { $in: id } })
            return authors;
        } catch (error) {
            throw new Error('An error while fetching the author data')
            console.log(error)
        }
    }
    async createAuthor(data) 
    {
        const author = await Author(data)
        try {
            author.save((error, author) => {
                if (error) {
                    return error.message
                }
                return author
            })
            return author
        } catch (error) {
            throw new Error('Creating author error')
            console.log(error)
        }
    }
    async findAuthorById(id) 
    {
        try {
            const author = await Author.findById(id)
            return author
        } catch (error) {
            throw new Error(error.message)
            console.log(error)
        }
    }
    async fetchAllAuthors(sortBy) 
    {
        try {
            const authors = await Author.find().sort(sortBy)
            return authors
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
    async getAuthorsWithBook(sortBy) 
    {
        try {
            const authors = await Author.aggregate([
                {
                    $lookup: {
                        from: "books",
                        localField: "_id",
                        foreignField: "author_id",
                        as: "books"
                    }
                }
            ])
            return authors;
        } catch (error) {
            console.log(error)
        }
    }
    async getAuthorBooksById(id) 
    {
        id = mongoose.Types.ObjectId(id)
        const authors = await Author.aggregate([
            {
                $match: {
                    '_id': id
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "author_id",
                    as: "books"
                }
            }
        ])
        return authors;
    }

}

module.exports = AuthorsService