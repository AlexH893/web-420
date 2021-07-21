/*
============================================
; Title:  haefner-node-shopper-routes.js
; Author: Alex Haefner
; Date:   10 Jul 2021
; Description: script
;===========================================
*/


//Importing Mongoose lib
var express = require('express');
const Customer = require("../models/haefner-customer.js");
const router = express.Router();

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags: 
 *       - Customer
 *     name: create customer
 *     summary: Creates a customer
 *     requestBody:
 *       description: This creates a new customer
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
*                - userName
 *             properties:
 *              firstName:
 *                 type: String
 *              lastName:
 *                 type: String
 *              userName:
 *                 type: String
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers', async(req, res) => {
    try {

        const newCustomer = {

            firstName: req.body.firstName,

            lastName: req.body.lastName,

            userName: req.body.userName
        }
        //Calling the customer create function, passing newCustomer object literal as argument
        await Customer.create(newCustomer, function(err, customer) {
            if (err) {

                console.log(err);
                res.status(501).send({

                    'message': `MongoDB Exception: ${err}`
                })
            } else {

                console.log(customer);
                res.json(customer);
            }
        })
    } catch (e) {

        console.log(e);
        res.status(500).send({

            'message': `Server Exception: ${e.message}`
        })
    }
})



/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Customer
 *     name: createInvoiceByUserName
 *     description: creates invoice using a userName
 *     summary: 
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Customer nvoice info 
 *         schema:
 *           type: string
 *     requestBody:
 *       description: invoice info
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: string
 *               tax:
 *                 type: string
 *               dateCreated:
 *                  type: string
 *               dateShipped:
 *                  type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       '200':
 *         description: Customer added
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */
router.post('/customers/:userName/invoices', async (req, res) => {
    try {
        Customer.findOne({ 'userName': req.params.userName }, function(err, customer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {            

            //Create object literal named newInvoice, map the RequestBody values to the object's properties
            const newInvoice = {

                subtotal: req.body.subtotal,
                tax: req.body.tax,
                dateCreated: req.body.dateCreated,
                dateShipped: req.body.dateCreated,
                lineItems: req.body.lineItems

            };

            //Call the push() function off of the invoices array and pass-in the newInvoice object literal
            customer.invoices.push(newInvoice);

            //Call the save() function on the Customer model and save the results to MongoDB
            customer.save(function(err, updatedInvoice) {//

                if(err) {

                    console.log(err);
                        res.status(501).send({
                            'message': `MongoDB Exception: ${err}`
                        })

                } else {

                    console.log(updatedInvoice);
                    res.json(updatedInvoice);

                }
            })
        }
        })
    } catch (err) {

        console.log(err);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })

    }
})

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Customer 
 *     description: return customer invoice by userName
 *     summary: Display all invoices 
 *     parameters:
 *       - name: username
 *         in: path                                   
 *         required: true
 *         description: Customer username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: array of invoices
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */

router.get('/customers/:userName/invoices', async(req, res) => {

    try {
        Customer.findOne({
            'userName': req.params.userName
        }, function(err, customer) {

            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                }) 

                } else {

                    console.log(customer);
                res.status(200).send (customer.invoices)
                }
        })

    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


//Exporting the router using module.exports
module.exports = router;