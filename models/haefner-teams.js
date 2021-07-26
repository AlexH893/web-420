/*
============================================
; Title:  haefner-composer.js
; Author: Alex Haefner
; Date:   21 Jul 2021
; Description: Capstone project
; Sources: https://mongoosejs.com/docs/guide.html
;===========================================
*/


//Importing Mongoose lib
let mongoose = require("mongoose");

const Schema = mongoose.Schema;


//Creating new schema with fields
let playerSchema = new Schema ({

    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number }

})


//Creating new schema with fields
let teamsSchema = new Schema ({

    name: { type: String },
    mascot: { type: String },
    players: [ playerSchema ] 

});

//Name the model "Customer" and export it 
module.exports = mongoose.model('Teams', teamsSchema);