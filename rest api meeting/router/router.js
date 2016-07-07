var express     =   require("express");
var router  =   express.Router();
var mongoOp     =   require("../models/calendarId");

router.route("/calendarId")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });
router.route("/calendarId")
    .post(function(req,res){
        var db = new mongoOp();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        // var current_date = new Date();
        var now = Date.now();
  //     var current_date = date.getDate()

    db.calendarId = req.body.calendarId;
		db.startTime=req.body.startTime;
		db.duration=req.body.duration;
    db.startDate =req.body.startDate;
    db.subject =req.body.subject;
    db.creationTime= now;
    db.meetingId=Math.random().toString(36).slice(2);
    var array = [];
    array=req.body.users;
    db.users=array;
//    console.log((db.CalendarId)+"-----"+(db.StartTime)+"-----"+(db.Duration)+"-----"+(db.StartDate)+"-----"+(db.subject));
        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"meetingId" : db.meetingId};
            }
            res.json(response);
        });
    });
	router.route("/calendarId/:meetingId")
    .get(function(req,res){
        var response = {};
        mongoOp.find({meetingId:req.params.meetingId},function(err,data){
        // This will run Mongo Query to fetch data based on meetingId.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })

	router.route("/calendarId/:meetingId").delete(function(req,res){
        var response = {};
        // find the data
        mongoOp.find({meetingId:req.params.meetingId},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                mongoOp.remove({meetingId : req.params.meetingId},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.meetingId+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })


module.exports = router;
