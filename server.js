var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var config = require('./config/config');
var routes = require('./routes/routes');

var app = express();

mongoose.connect(config.connectionString);
var db = mongoose.connection;

var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/api', routes);

var port = 8000;

server.listen(port, function () {
    console.log('Server up and runnning on port ' + port);
});

module.exports = app;
