/*
============================================
; Title:  haefner-person.js
; Author: Alex Haefner
; Date:   25 Jun 2021
; Description: script
; Sources: https://mongoosejs.com/docs/schematypes.html
;===========================================
*/

//Importing Mongoose lib
let mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creating new schema with fields
const roleSchema = new Schema ({
    text: { type: String },
});


//Creating new schema with fields
const dependentSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
});


//Creating new schema with fields
const personSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
    roles: { type: array }, [roleSchema],
    dependents: { type: array }, [dependentSchema],
    birthDate: { type: String },

});

//Name the model "Person" and export it using module.exports
module.exports = mongoose.model('Person', personSchema);