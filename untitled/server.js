/**
 * Created by vinay.sahu on 2/25/16.
 */
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();
var server = http.Server(app);

app.use(bodyParser.json());
app.enable('trust-proxy');
app.use(express.static(__dirname + '/public'));

server.listen(8080,"0.0.0.0", function () {
    console.log("trishul-app ui listening at: 8080");
});



