const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')
class BooksRequest {
    CreateRequest(req, res, next)
    {
        const { title, author_id, book_published } = req.body
        const data = { title, author_id, book_published }
        let message = {}
        const emptyField = []
        if(!title || !author_id){
            if(!title && !author_id){
                emptyField.push({detail: "Title is required"},{detail: "author_id is required"})
            }else{
                emptyField.push({detail: `${title? 'author_id': 'Title'} is required`})
            }
            return res.status(422).json({errors: emptyField})
        }
        if(!mongoose.Types.ObjectId.isValid(author_id)){
            emptyField.push({detail: "Invalid author_id"})
        }
        if(emptyField.length>0) return res.status(422).json({errors: emptyField})

        req.data = data
        next()
    }                                                             
}

module.exports = BooksRequest