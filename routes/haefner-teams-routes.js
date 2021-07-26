/*
============================================
; Title:  haefner-team-routes.js
; Author: Alex Haefner
; Date:   21 Jul 2021
; Description: Capstone project
;===========================================
*/

//Importing Mongoose library
var express = require('express');
const Teams = require("../models/haefner-teams.js");
const router = express.Router();

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning all team documents
 *     summary: returns an array of team documents in JSON format.
 *     responses:
 *       '200':
 *         description: array of team documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

 router.get('/teams', async(req, res) => {

     try {

         Teams.find({}, function(err, teams) {

             if (err) {

                 console.log(err); //left off here
                 res.status(501).send({

                     'message': `MongoDB exception ${err}`
                 })
             } else {
                 console.log(teams);
                 res.json(teams);
             }
         })
     } catch (e) {
         console.log(e);
         res.status(500).send({
             'message': `Server exception: ${e.message}`
         })
     }
 })


/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API for adding a player document 
 *     summary: Creates a new player document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the team to add a player to
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Team information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *              firstName:
 *                 type: string
 *              lastName:
 *                 type: string
 *              salary:
 *                 type: number
 * 
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/teams/:id/players', async(req, res) => {

    try {

        const newPlayer = {

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            salary: req.body.salary

        }

        Teams.findOne({'_id': req.params.id}, function(err, teams) {

            if (err) {

                console.log(err);

                res.status(500).send({

                    'message': `MongoDB Exception: ${err}`
                })

            } else if (!teams){

                res.status(401).send({

                    'message': `Team not found: ${req.params.id}`
                })

            } else {

                teams.players.push(newPlayer);

                Teams.updateOne(teams, function(error, updatedTeam){

                    if (err) {

                        console.log(err);

                        res.status(500).send({

                            'message': `MongoDB Exception: ${err}`
                        })

                    } else {
                        console.log(newPlayer.firstName + " has been added to the team!");
                        console.log(teams);
                        res.json(teams);
                    }
                }); 
                
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
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/id/players:
 *   get:
 *     tags:
 *       - Teams
 *     name: findAllPlayersByTeamId
 *     description:  return player documents
 *     summary: returns player documents based on entered team id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.get('/teams/:id/players', async(req, res) => {

     try {

         Teams.findOne({'_id': req.params.id}, function(err, teams) {

             if (err) {

                 console.log(err);
                 res.status(500).send({

                     'message': `MongoDB Exception: ${err}`
                 })
             } else {

                 console.log(teams.players);
                 res.json(teams.players);
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
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeam
 *     description: API for deleting a document from MongoDB
 *     summary: Removes a team document from MongoDB
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to be deleted 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.delete('/teams/:id', async (req, res) => {

     try {

 Teams.findByIdAndDelete({'_id': req.params.id}, function(err, teams) {

             if(err) {

                 console.log(err);
                 res.status(401).send({

                     'message': `Invalid Teams Id: ${err}`
                 })
             } else {

                 console.log(teams);
                 console.log("Team with the id of" + req.params.id +
                 " has been deleted succesfully");
                 res.json(teams);
             }
         })
     } catch (e) {

         console.log(e);
         res.status(500).send({

             'message': `Server exception ${e.message}`
         })
     }
 })








/*********************************
This API is for testing purposes *
**********************************/

/**
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     name: createTeam
 *     description: Adding new team document to MongoDB Atlas
 *     summary: Create a new team document
 *     requestBody:
 *       description: Team information
 *       content:
 *         application/json:
 *           schema:
 *             required:
  *               - name
 *               - mascot
 *               - players
 *             properties:
 *              name:
 *                 type: String
 *              mascot:
 *                 type: String
 *              players:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          salary:
 *                              type: number  
 *     responses:
 *       '200':
 *         description: Team added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.post('/teams', async(req, res) => {
    try {

        //Create new object literal named newTeams and map the RequesBody fields to its properties 
        const newTeams = {

            name: req.body.name,
            mascot: req.body.mascot,
            players: req.body.players

        }

        await Teams.create(newTeams, function(err, teams) {

            if (err) {

                console.log(err);
                res.status(501).send({

                    'message': `MongoDB Exception: ${err}`
                })
            } else {

                console.log("Team " + req.body.name + " has been added.");
                console.log(teams);
                res.json(teams);
            }
        })
    } catch (e) {

        console.log(e);
        res.status(500).send({
            
            'message': `Server Exception: ${e.message}`
        })
    }
})


 module.exports = router;