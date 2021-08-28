
const BooksService = new (require('./BooksService'))
const AuthorsService = new (require('./AuthorsService'))
const UsersService = new (require('./UsersService'))

module.exports = { BooksService, AuthorsService, UsersService }