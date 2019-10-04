const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// grabs details for specific event
router.get('/calendar', (req, res) => {
  let queryText = 'SELECT * FROM "event"  WHERE "end_date" > CURRENT_DATE - 30;';
  pool.query(queryText)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('error in event Calendar GET', error);
    res.sendStatus(500);
  })
});

module.exports = router;