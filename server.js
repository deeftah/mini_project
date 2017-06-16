var http = require("http");
console.log("Starting");
var host = "127.0.0.1";
var port = 1337

var url = 'mongodb://127.0.0.1:27017/';
var database = 'managment';
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var format = require('util').format;


var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var dbcon; 

MongoClient.connect(url+database, function(err,db){
	if(err){
		throw err;
	}
	dbcon = db;
	console.log("connected to the database");
});


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get("/index",function(req,res){
 
    dbcon.collection("document").find().toArray(function (error, results) {
		if (error) {
	    	throw error;
	    }
	    res.json(results);
    });
});

app.post("/admin",function(req,res){
    dbcon.collection("document").insert(req.body, function(err,data)
    {
    	if (err) throw err;
        res.json(data);
    });
});

app.listen(port,host);
console.log("Listening at " + host + ":"+port);