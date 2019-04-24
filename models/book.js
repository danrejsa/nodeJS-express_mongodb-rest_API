const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title: String,
    genre: String,
    description: String,
    author: String,
    publisher: String,
    pages:Number,
    img_url: String,
    buy_url:String

})

module.exports = mongoose.model("Book", bookSchema)