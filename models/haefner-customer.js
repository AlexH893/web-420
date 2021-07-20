/*
============================================
; Title:  haefner-customer.js
; Author: Alex Haefner
; Date:   8 Jul 2021
; Description: script
;===========================================
*/

//Importing Mongoose lib
let mongoose = require("mongoose");

//Add a new variable named Schema and assign it the mongoose.Schema object
const Schema = mongoose.Schema;

//Creating schema with fields
let lineItemSchema = new Schema ({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
})

//Creating schema with fields
let invoiceSchema = new Schema ({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema],
})


//Creating schema with fields
let customerSchema = new Schema({

    firstName: { type: String},
    lastName: { type: String },
    userName: { type: String},
    invoices: [ invoiceSchema ],

});


//Name the model "Customer" and export it 
module.exports = mongoose.model('Customer', customerSchema);