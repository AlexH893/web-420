/*
============================================
; Title:  haefner-user.js
; Author: Alex Haefner
; Date:   1 Jul 2021
; Description: script
; Sources: 
;===========================================
*/

//Importing Mongoose lib & assigning it to a variable named mongoose
let mongoose = require("mongoose");

//Add a new variable named Schema and assign it the mongoose.Schema object
const Schema = mongoose.Schema;

//Creating schema with fields
const userSchema = new Schema ({
    userName: { type: String },
    password: { type: String },
    emailAddress: { type: Array }
});

//Name the model "User" and export it 
module.exports = mongoose.model('User', userSchema);