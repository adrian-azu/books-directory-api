const express = require('express')
const mongoose = require('mongoose')
const { Book } = require('../models')

class BooksService {
    async fetchAllBooks(sortBy = 'createdAt') {
        try {
            return await Book.find().sort(sortBy)
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
    async createBook(data) {

        try {
            const book = await Book.create(data)
            return book;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
    async fetchAllBooksWithAuthor() {
        const resources = {
            title: "$title",
            date_published: "$date_published"
        }
        try {
            const books = await Book.aggregate([{
                $lookup: {
                    from: "authors",
                    localField: "author_id",
                    foreignField: "_id",
                    as: "author"
                }
            }])
            return books
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
    async updateBook(id, data) {
        try {
            const book = await Book.findOneAndUpdate(id, data)
            return book;
        } catch (error) {
            console.log(error)
            throw new Error("Book cannot be update")
        }
    }
    async deleteBook(id) {
        try {
            const book = await Book.findOneAndDelete(id)
            return book;
        } catch (error) {
            console.log(error)
            throw new Error("Book cannot be delete")
        }
    }
    async getBookById(id) {
        try {
            const book = await Book.findById(id)
            return book
        } catch (error) {
            console.log(error)
            throw new Error("Error while fetching book")
        }
    }
    async getBookWithAuthorById(id) {
        try {
            id = mongoose.Types.ObjectId(id)
            const book = await Book.aggregate([
                {
               "$match": {

                    '_id':id
                }
            }, {
                $lookup: {
                    from: "authors",
                    localField: "author_id",
                    foreignField: "_id",
                    as: "author"
                }
            }
            ])
            return book
        } catch (error) {
            throw new Error("Error while fetching resource")
            console.log(error)
        }
    }
}

module.exports = BooksService