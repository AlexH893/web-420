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
 router.post('/signup', async(req, res) => {

    try {

        User.findOne({'userName': req.params.userName}, function(err, user) {

            //Create object literal named newRegisteredUser, map the RequestBody values to the object’s properties
            if(!User) {
                const newRegisteredUser = {
                    userName: req.body.userName,
                    password: req.body.password,
                    emailAddress: req.body.emailAddress

                };
                let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

                //Call the create() function on the User model and save the record to MongoDB
                await User.create(newRegisteredUser, function(err, user) {

                    if (err) {

                        console.log(err);
                        res.status(501).send({

                        'message': `MongoDB Exception: ${err}`

                        })

                    } else {

                        console.log(user);
                        res.json(user);
                    }
                })

            } else if(User) {

                
                res.status(401).send({

                'message': `Username is already in use`

                })
            }
        })

    } catch (e) {

        console.log(e);
        res.status(500).send({
            
            'message': `Server Exception: ${e.message}`
        })
    }
})