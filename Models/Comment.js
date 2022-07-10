const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    commentText: String,
    user: String,
    date: {
        type: Date,
        default: Date.now
    },
    post: String,
});
module.exports = mongoose.model('Comment', commentSchema);