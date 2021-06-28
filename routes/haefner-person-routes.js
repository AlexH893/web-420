/*
============================================
; Title:  haefner-person-routes.js
; Author: Alex Haefner
; Date:   25 Jun 2021
; Description: Routes for persons
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
 *       - Person
 *     description: An API for returning array containing persons
 *     summary: returns array of persons in formatted in JSON
 *     responses:
 *       '200':
 *         description: Array of persons
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
 *       - Person
 *     name: createPerson
 *     description: An API for adding new person doc to MongoDB Atlas
 *     summary: Create new person doc
 *     requestBody:
 *       description: Person information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *              firstName:
 *                 type: string
 *              lastName:
 *                 type: string
 *              roles:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          Role Title:
 *                              type: string
 *              dependents:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *              birthDate:
 *                  type: string
 * 
 *     responses:
 *       '200':
 *         description: Person added
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