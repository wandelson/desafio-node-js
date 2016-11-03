const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const routes = require('./routes/routes');
const http = require('http');

const app = express();

const port = process.env.PORT || 8000; // first change

const server = http.createServer(app);

mongoose.connect(config.connectionString);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/api', routes);

server.listen(port, () => {
  console.log(`Server up and runnning on port ${port}`);
});

module.exports = app;
