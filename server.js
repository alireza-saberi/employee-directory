/*
* @Author: Ali
* @Date:   2017-03-02 10:59:49
* @Last Modified by:   Ali
* @Last Modified time: 2017-03-02 13:16:54
*/

'use strict';
/******** Requiring libraries ********/
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    swaggerJSDoc = require('swagger-jsdoc');



/******* Swagger *********/ 
// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating employee directory RESTful API with Swagger',
    },
    host: 'localhost:8080',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);


/******** Setting ********/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', 8080);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(morgan('dev'));


/******** Routing ********/
app.use(express.static(__dirname + '/dist'));
require('./routes/route.js')(app, swaggerSpec);
