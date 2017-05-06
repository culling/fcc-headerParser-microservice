/*
User Story: I can get the IP address, language and operating system for my browser.
example output: {"ipaddress":"203.161.96.130","language":"en-GB","software":"Windows NT 10.0; Win64; x64"}
*/
var express = require("express");
var app     = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'c9';
var config  = require("./config/config.js");


app.get("/", function(req, res){
    var clientIP = req.headers["x-forwarded-for"] || req.ip;;
    var clientOS = req.headers["user-agent"].match( "\([\(]([^)]*)\)" )[2] ;
    var clientLang = req.headers["accept-language"].split(",")[0];

    var responseObject = {};    
    responseObject.ipaddress = clientIP;
    responseObject.language  = clientLang;
    responseObject.software  = clientOS;
    
    res.send(responseObject);
    
});



app.listen(config.port, function(){
    console.log("listening on port: " + config.port );
});