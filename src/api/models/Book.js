const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const BookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author_id:{
        type: Schema.Types.ObjectId, 
        ref:'Author',
        required: true
    },
    date_published: {
        type: Date,
        default: Date.now()
    }
},{timestamps: true})

BookSchema.plugin(mongoosePaginate);
const Book = mongoose.model('Book', BookSchema)

module.exports = Book