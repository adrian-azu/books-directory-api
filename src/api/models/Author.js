const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const AuthorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
})
AuthorSchema.plugin(mongoosePaginate);

const Author = mongoose.model('Author', AuthorSchema)
module.exports = Author