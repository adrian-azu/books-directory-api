const { body, validationResult, checkSchema, param } = require('express-validator')
const { BookServices, AuthorServices } = require('../services')
const mongoose = require('mongoose')

exports.rules = (method) => {
  switch (method) {
    case 'create': {
      return [
        body("title").exists().isString().trim().escape(),
        body("date_published").optional().isDate().toDate(),
        body('author_id').notEmpty().withMessage('Author is required').isString().withMessage('invalid Author id').custom(author_id => {
          if(!mongoose.Types.ObjectId.isValid(author_id)){
              return Promise.reject('Invalid author id')
          }
          return AuthorServices.findAuthorById(author_id).then(author => {
            if (!author) {
              return Promise.reject('No author with the id is found')
            }
          })
        }),
      ]
      break;
    }
    case 'update': {
      return [
        param('id',['shet']).custom(id => {
          if(!mongoose.Types.ObjectId.isValid(id)){
              return Promise.reject('Invalid book id')
          }
        }),
        body("title").optional().isString().trim().escape(),
        body("date_published").optional().isDate().toDate()
        
      ]
      break;
    }
    case 'delete': {
      return [
        param('id',['shet']).notEmpty(),
      ]
      break;
    }
  }
}

exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}