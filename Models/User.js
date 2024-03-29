const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    passwordHash: String,
    passwordPlain: String,
    email: String,
    phone: String,
    admin: Boolean
});

module.exports = mongoose.model("User", UserSchema);