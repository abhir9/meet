var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =  require("./router/router");
var logger = require('morgan');

app.set('port', process.env.PORT || 4004);
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "you got it......"});
});


app.use('/',router);

app.listen(app.get('port'));
console.log("Listening to PORT 4004");
