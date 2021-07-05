/*
============================================
; Title:  haefner-session-routes.js
; Author: Alex Haefner
; Date:   1 Jul 2021
; Description: Routes for user
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
 *   post:
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
 *                 type: String
 *              password:
 *                 type: String
 *              emailAddress:
 *                  type: String
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: UserName is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/signup', async (req, res) => {
    try {
        User.findOne({
            'userName': req.body.userName
        }, function(err, user) {

            //Create object literal named newRegisteredUser, map the RequestBody values to the object's properties
            if (!user) {
                const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
                const newRegisteredUser = {
                    userName: req.body.userName,
                    password: hashedPassword,
                    emailAddress: req.body.emailAddress,

                };

                //Call the create() function on the User model and save the record to MongoDB
                User.create(newRegisteredUser, function(err, user) {
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
            }
            if (user) {
                                console.log(user);

                res.status(401).send("Username is already in use");

            }
        })

    } catch (error) {
        res.status(500).send("server exception")
    }
})

/**
 * Login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Log in
 *     name: login
 *     summary: Login a user
 *     requestBody:
 *       description: Logging in a user
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *              userName:
 *                 type: String
 *              password:
 *                 type: String
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid userName and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/login', async (req, res) => {
    try {
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

//Exporting the router using module.exports
module.exports = router;