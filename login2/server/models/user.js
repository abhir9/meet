// ./models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: String,
    firstName: String,
    lastName: String,
    password: String,
	role: String
});
module.exports = mongoose.model('User', UserSchema);