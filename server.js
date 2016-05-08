/**
 * Created by vinay.sahu on 2/25/16.
 */
var express = require('express');
var http = require('http');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
var server = http.Server(app);

app.use(bodyParser.json());
app.enable('trust-proxy');
app.use(express.static(__dirname + '/public'));
app.post("/getResponse", function(req, res){
    serveRequest(req.body, function(err, data){
        if(err){
            res.status(500).send(err);
        }else{
         res.status(200).send(data);
        }
    })
});

app.get("/hello", function(req, res){
    res.status(200).send();
});
server.listen(8080,"0.0.0.0", function () {
    console.log("api health listening at: 8080");
});


var serveRequest=function(data, callback){
  var len = data.length;
  var clen = 0;
    var response=[];
    for(var i=0;i<len;i++){
        if("GET"==data[i].type){
            getRequest(data[i], response, function(data){
                clen++;
                if(clen==len){
                    callback(null, response);
                }
            });
        }else{
            postRequest(data[i], response, function(data){
                clen++;
                if(clen==len){
                    callback(null, response);
                }
            });
        }
    }
    if(!len)
        callback(null, null);
};

var getRequest = function(data, resp, callback){
    var obj = {api:data.api,type:"GET",status:"",time:""};
    var t = Math.floor(Date.now());
    request(data.api, function (error, response, body) {
            obj.response = response?response.statusCode:"404";
            obj.time = Math.floor(Date.now())-t;
            resp[resp.length]=obj;
            callback(null);
    })
};
var postRequest = function(data, resp, callback){
    var obj = {api:data.api,type:"POST",status:"",time:""};
    var t = Math.floor(Date.now() / 1000);
    request.post({url:data.api}, function(err,response,body){
        obj.response = response?response.statusCode:"404";
        obj.time =  Math.floor(Date.now())-t;
        resp[resp.length]=obj;
        callback(null);
    })
};
