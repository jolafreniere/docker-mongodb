const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    text: String,
    createdAt:
    {
     type: Date,
        default: Date.now
    },
    author:{
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model("Post", PostSchema);