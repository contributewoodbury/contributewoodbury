const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get the nonprofit's information from the database
router.get('/:id', (req, res) => {
    let queryText =  `SELECT "event".name, "event".id, "event".start_date FROM "event" 
        JOIN "nonprofit" ON "nonprofit".id = "event".non_profit_id
        WHERE "nonprofit".id = $1;`;
    let id = req.params.id
    pool.query(queryText, [id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error in nonprofit GET', error);
            res.sendStatus(500);
        })
})

//grabs editable information from the specified nonprofit for editing. 
router.get('/edit/:id', rejectunauthenticated, (req, res) => {
    let queryText = `SELECT "nonprofit".name, "nonprofit".id, "nonprofit".contact_email, "nonprofit".address,
    "nonprofit".city, "nonprofit".zip_code, "nonprofit".website, "nonprofit".logo, "nonprofit".category_id FROM "nonprofit" WHERE "id";`;
    pool.query(queryText, [req.params.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error in edit nonprofit GET', error);
        res.sendStatus(500);
    });
})




module.exports = router;