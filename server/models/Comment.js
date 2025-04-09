const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    idMeal: String,
    username: String,
    comment: String
});


const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = CommentModel;