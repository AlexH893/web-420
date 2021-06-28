/*
============================================
; Title:  haefner-person-routes.js
; Author: Alex Haefner
; Date:   25 Jun 2021
; Description: script
; Sources: 
;===========================================
*/

//Importing Mongoose lib
var express = require('express');
const router = express.Router();
const Persons = require("../models/haefner-person.js");


/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: API for returning an array of persons.
 *     summary: returns an array of persons in JSON format.
 *     responses:
 *       '200':
 *         description: Array of the persons
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/persons', async(req, res) => {

    try {

        Persons.find({}, function(err, persons) {

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




/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     name: createPerson
 *     description: Adding new persons document to MongoDB Atlas
 *     summary: Create a new persons document
 *     requestBody:
 *       description: Person information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *              firstName:
 *                 type: string
 *              lastName:
 *                 type: string
 * 
 *     responses:
 *       '200':
 *         description: Array of person documents
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

module.exports = router 