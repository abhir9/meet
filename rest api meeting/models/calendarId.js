var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var CalenderSchema = new Schema({
    "calendarId": String,
    "startTime": String,
    "duration": String,
    "startDate": Date,
    "subject": String,
    "meetingId": String,
    "creationTime": Date,
    "users": Array

});
// create model if not exists.
module.exports = mongoose.model('scheduleMeeting',CalenderSchema);
