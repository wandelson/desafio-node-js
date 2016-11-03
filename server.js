var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');
var config = require('./config/config');
var routes = require('./routes/routes')
var http = require('http');

var app = express();

var port = process.env.PORT || 8000; // first change

var server = http.createServer(app);

mongoose.connect(config.connectionString);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use('/api',routes);

server.listen(port, function(){
    console.log('Server up and runnning on port ' + port);
});


module.exports = app;