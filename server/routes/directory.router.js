const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Gathers all nonprofits from the database who have been approved
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "nonprofit" WHERE "is_approved";`;

  pool.query(queryText)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('error in directory GET', error);
    res.sendStatus(500);
  });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;