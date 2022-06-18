const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    tag: String
});

articleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', articleSchema);