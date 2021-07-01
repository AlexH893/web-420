/*
============================================
; Title:  haefner-session-routes.js
; Author: Alex Haefner
; Date:   1 Jul 2021
; Description: Routes for users
; Sources: 
;===========================================
*/

//Requirement statements
var express = require('express');
const User = require("../models/haefner-user.js");
const bcrypt = require('bcryptjs');

//Create variable named router assigned to express.Router() function
const router = express.Router();

//Create variable saltRounds with integer value of 10
const saltRounds = 10;

/**
 * Signup
 * @openapi
 * /api/signup:
 *   POST:
 *     tags:
 *       - Sign up
 *     name: signup
 *     summary: Sign up a user
 *     requestBody:
 *       description: Signing up a user
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *              userName:
 *                 type: string
 *              password:
 *                 type: string
 *              emailAddress:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/persons', async(req, res) => {
    try {
        //Create new object literal named newPerson and map the RequesBody fields to its properties 
        const newPersons = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.role,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate
        }

        await Persons.create(newPersons, function(err, persons) {

            if (err) {

                console.log(err);
                res.status(501).send({

                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(persons);
                res.json(persons);
            }
        })
    } catch (e) {

        console.log(e);
        res.status(500).send({
            
            'message': `Server Exception: ${e.message}`
        })
    }
})