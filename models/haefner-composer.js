/*
============================================
; Title:  haefner-composer.js
; Author: Alex Haefner
; Date:   19 Jun 2021
; Description: script
; Sources: https://mongoosejs.com/docs/guide.html
;===========================================
*/

//Importing Mongoose lib
let mongoose = require("mongoose");


const Schema = mongoose.Schema;

//Creating new schema with fields
const composerSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
});

//Name the model “Composer” and export it using module.exports
module.exports = mongoose.model('Composer', composerSchema);
