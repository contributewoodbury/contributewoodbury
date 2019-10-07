const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get the nonprofit's information from the database
router.get('/:id', (req, res) => {
    let queryText =  `SELECT "event".name, "event".id, "event".start_date, "nonprofit".name AS "nonprofit_name", 
        "nonprofit".address AS "nonprofit_address", "nonprofit".city 
        AS "nonprofit_city", "nonprofit".zip_code AS "nonprofit_zip_code", "nonprofit".contact_email 
        AS "nonprofit_contact_email", "nonprofit".description AS "nonprofit_description"  FROM "event" 
        JOIN "nonprofit" ON "nonprofit".id = "event".non_profit_id
        WHERE "nonprofit".id = $1;`;
    let id = req.params.id
    pool.query(queryText, [id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})








module.exports = router;