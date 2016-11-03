var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('config');

var http = require('http');
let morgan = require('morgan');
var routes = require('./routes/routes')
var port = 8000;
var app = express();

let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


if (config.util.getEnv('NODE_ENV') !== 'test') {

    app.use(morgan('combined'));
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/api', routes);


app.get("/", (req, res) => res.json({ message: "Welcome to our REST API!" }));


app.listen(port, function () {
    console.log('Server up and runnning on port ' + port);
});


module.exports = app;
