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

app.get("/admin/:ID",function(req,res){
    var id = req.params.ID;
    dbcon.collection("document").remove({'_id': ObjectId(id)}, function (error, results) {
		if (error) {
	    	throw error;
	    }
	    res.json(results);
    });
});

app.get("/visualisation/:ID",function(req,res){
    var id = req.params.ID;
    dbcon.collection("document").findOne({'_id': ObjectId(id)}, function (error, results) {
		if (error) {
	    	throw error;
	    }
	    res.json(results);
    });
});

var update = function($status, $id, $signature){
	var results;
    dbcon.collection("document").update({'_id': ObjectId($id)}, {$set: {'status' : $status, 'signature': $signature}}, function (error, res) {
		if (error) {
	    	throw error;
	    }
	    results = res;
    });
    return results;
};

app.get("/visualisation/:ID/:TYPE/:SIGNATURE",function(req,res){
    var id = req.params.ID;
    var type = req.params.TYPE;
    var signature = req.params.SIGNATURE;

    if(type=="Quotation")
    {
        var results = update("Accepted", id, signature);
    	res.json(results);
    }
    else if(type=="Invoice")
    {
    	var results = update("Payed", id, signature);
        res.json(results);
    }	
});

app.listen(port,host);
console.log("Listening at " + host + ":"+port);