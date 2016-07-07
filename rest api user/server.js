var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =  require("./router/router");
var logger = require('morgan');

app.use(bodyParser.json());
app.use(logger('dev'));

app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});


app.use('/',router);

app.listen(4004	);
console.log("Listening to PORT 4004");