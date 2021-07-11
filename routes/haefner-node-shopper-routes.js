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
const Composer = require("../models/haefner-customer.js");
const router = express.Router();

/**
 * createCustomer
 * @openapi
 * /api/customers
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
router.post('/customers', async (req, res) => {
    try {

        const newCustomer = {

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName

        };

    //Calling the customer create function, passing newCustomer object literal as argument
    Customer.create(newCustomer, function(err, customer) {
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






        User.findOne({
            'userName': req.body.userName
        }, function(err, user) {
            if (err) res.status(501).send("MongoDB exception")
            
            //Create object literal named newRegisteredUser, map the RequestBody values to the objects properties
            if (user) {
                //Compare the RequestBody password against the saved users password using the bcrypt.compareSync() function
                let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                //Checks if password is valid
                if (passwordIsValid) {
                    //Returns message for status 200
                    console.log('Password is valid!');
                    res.status(200).send({'message': 'User logged in'})
                } else {
                    res.status(401).send("Invalid username and/or password")
                }
            }

            if (!user) res.status(401).send("Invalid username and/or password")
        });
    } catch (error) {
        res.status(500).send("server exception")
    }
})