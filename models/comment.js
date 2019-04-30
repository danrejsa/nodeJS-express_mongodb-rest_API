const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    message: String
})

module.exports = mongoose.model("Comments", commentSchema);