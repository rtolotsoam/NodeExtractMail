'use strict'

const express    = require('express');
const bodyParser = require('body-parser');
const http       = require('http');
const morgan     = require('morgan');
const app        = express();



// API file for interacting with Postgres
const api = require('./api/router');

// Headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-access-token");
  next();
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use(morgan('dev'));

// API location
app.use('/', api);




//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));