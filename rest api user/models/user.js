var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var UserSchema = new Schema({
	email: String,
    firstName: String,
    lastName: String,
    password: String,
	role: String
});

// create model if not exists.
module.exports = mongoose.model('userLogin',UserSchema);