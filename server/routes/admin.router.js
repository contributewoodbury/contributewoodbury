const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//updates nonprofit's approval to true
router.put('/approve/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `UPDATE "nonprofit" SET "is_approved" = 'true' WHERE "id" = $1;`;
    let id = req.params.id
    pool.query(queryText, [id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error in updating approval for nonprofit', error)
            res.sendStatus(500);
        })
})

//deletes a nonprofit when their request is denied
router.delete('/decline/:id', rejectUnauthenticated, (req,res) => {
    let queryText = `DELETE FROM "nonprofit" WHERE "id" = $1;`;
    let id = req.params.id;
    pool.query(queryText, [id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error in deleted declined requests for nonprofits', error)
            res.sendStatus(500);
        })
})

//gets the nonprofit requests from the database
router.get('/requests', rejectUnauthenticated, (req, res) => { 
    let queryText = `SELECT * FROM "nonprofit" WHERE "is_approved" = 'false';`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error in getting requested for nonprofits', error)
            res.sendStatus(500);
        })
})

module.exports = router;