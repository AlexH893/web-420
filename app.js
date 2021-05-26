/*
============================================
; Title:  app.js
; Author: Alex Haefner
; Date:   25 May 2021
; Description: app.js
;===========================================
*/

//Importing express library
var express = require("express");

//Importing http library
var http = require("http");

//Importing swagger-UI-express library
var swaggerUi = require('swagger-ui-express');

//Importing swagger-jsdoc library
var swaggerJSDoc = require('swagger-jsdoc');

//Importing mongoose library
var mongoose = require('mongoose');

//Registering app
var app = express();

//Setting the port to process.env.PORT || 3000 
app.set("port", process.env.PORT || 3000);

//Setting the app to use express.json
app.use(express.json());

//Middleware function that parses incoming requests
app.use(express.urlencoded({
     'extended': true
    }));

const options = {

    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTFul APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], //Files containing annotations for the OpenAPI specification
};

//Creating new var, calling swaggerJSDoc library using the options object literal
var openapiSpecification = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));



//creating server, listening on port 3000
http.createServer(app).listen(3000, function() {
    console.log('App started on port 3000!');
});
