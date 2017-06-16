var http = require("http");
console.log("Starting");
var host = "127.0.0.1";
var port = 1337

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get("/index",function(req,res){
 
});

app.listen(port,host);
console.log("Listening at " + host + ":"+port);