const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

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
            console.log('error in nonprofit GET', error);
            res.sendStatus(500);
        })
})

//grabs editable information from the specified nonprofit for editing. 
router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT "nonprofit".name, "nonprofit".id, "nonprofit".contact_email, "nonprofit".address,"nonprofit".description,
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

//edits nonprofits information 
router.put('/editNonprofit', rejectUnauthenticated, (req,res) => {
    let queryText = `UPDATE "nonprofit" SET "name" = $1, "contact_email" = $2, "address" = $3, "city" = $4, 
        "zip_code" = $5, "website" = $6, "logo" = $7, "description" = $8, "last_confirmed" = CURRENT_DATE WHERE "id" = $9;`;
    let name = req.body.name;
    let contact_email = req.body.contact_email;
    let address = req.body.address;
    let city = req.body.city;
    let zip_code = req.body.zip_code;
    let website = req.body.website;
    let logo = req.body.logo;
    let description = req.body.description;
    let id = req.body.id
    pool.query(queryText, [name, contact_email, address, city, zip_code, website, logo, description, id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error in edit nonprofit PUT', error);
        })
})





module.exports = router;