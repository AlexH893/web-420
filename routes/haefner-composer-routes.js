/*
============================================
; Title:  haefner-composer-routes.js
; Author: Alex Haefner
; Date:   19 Jun 2021
; Description: script
; Sources: https://mongoosejs.com/docs/guide.html
;===========================================
*/

//Importing Mongoose lib
var express = require('express');
const Composer = require("../models/haefner-composer.js");
const router = express.Router();


/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composers.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: Array of the composers
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/composer', async(req, res) => {

    try {

        Composer.find({}, function(err, composers) {

            if (err) {

                console.log(err);
                res.status(501).send({

                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
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
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  Returning composer doc
 *     summary:
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.get('/composers/:id', async(req, res) => {

    try {

        Composer.findOne({'_id': req.params.id}, function(err, composer) {

            if (err) {

                console.log(err);
                res.status(500).send({

                    'message': `MongoDB Exception: ${err}`
                })
            } else {

                console.log(composer);
                res.json(composer);
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
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: Adding new composer document to MongoDB Atlas
 *     summary: Create a new composer document
 *     requestBody:
 *       description: Composer information
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
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/composers', async(req, res) => {
    try {
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        await Composer.create(newComposer, function(err, composer) {

            if (err) {

                console.log(err);
                res.status(501).send({

                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
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