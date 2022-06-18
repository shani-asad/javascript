const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    articleId: String
});

module.exports = mongoose.model('Comment', commentSchema);