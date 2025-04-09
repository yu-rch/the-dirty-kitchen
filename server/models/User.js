//create a schema
const mongoose = require('mongoose');
//CREATE SCHEMA
const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password : String
});

const UserModel = mongoose.model("tableones", UserSchema);
module.exports = UserModel;