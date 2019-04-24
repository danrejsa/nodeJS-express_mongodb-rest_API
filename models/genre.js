const mongoose = require('mongoose');
 const genreSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     name: String
 })

 module.exports = mongoose.model("Genre", genreSchema)