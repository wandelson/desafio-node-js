var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var config = require('./config/config');
var routes = require('./routes/routes');

var port = 8000;
var app = express();

var server = http.createServer(app);

mongoose.connect(config.connectionString);

var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/api', routes);

server.listen(port, function () {
    console.log('Server up and runnning on port ' + port);
});


module.exports = app;
