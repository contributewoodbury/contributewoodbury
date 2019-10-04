const express = require('express');
const pool = require('../modules/pool');
const router = express.Router(); 
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

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

//get the past events for a specific nonprofit
router.get('/nonprofit/:id', rejectUnauthenticated, (req,res) => {
  let queryText = `SELECT "event".name, "event".id, "event".start_date FROM "event" JOIN "nonprofit"
    ON "nonprofit".id = "event".non_profit_id
    WHERE "nonprofit".id = $1 AND "event".end_date < CURRENT_DATE;`;
  let id = req.params.id
  pool.query(queryText, [id])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      console.log('error in event specific nonprofit get', error)
      res.sendStatus(500)
    })
});

// grabs details of a specific event
router.get('/:id', (req, res) => {
  let queryText = 'SELECT * FROM "event" WHERE "id" = $1;';
  pool.query(queryText, [req.params.id])
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('error in event details GET', error);
    res.sendStatus(500);
  });
})

// grabs volunteer roles for a specific event

module.exports = router;