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
  console.log('get past events for this id:', req.params.id);
  
  let queryText = `SELECT * FROM "event" WHERE "non_profit_id" = $1 AND "end_date" < CURRENT_DATE;`;
  let id = req.params.id
  pool.query(queryText, [id])
    .then((result) => {
      console.log('GET PAST EVENTS::', result.rows);
      
      res.send(result.rows)
    })
    .catch((error) => {
      console.log('error in event specific nonprofit get', error)
      res.sendStatus(500)
    })
});

// grabs details of a specific event
router.get('/:id', (req, res) => {
  console.log('get details of event for this id:', req.params.id);
  
  let queryText = 'SELECT * FROM "event" WHERE "id" = $1;';
  pool.query(queryText, [req.params.id])
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('error in event details GET', error);
    res.sendStatus(500);
  });
});

//adds new event for specific nonprofit
router.post('/addEvent', rejectUnauthenticated, (req,res) => {
  console.log('user id is:', req.user.id);
  
  let queryText = `INSERT INTO "event" ("name", "non_profit_id", "description", "address", "city", "zip_code",
    "start_date", "end_date", "start_time", "end_time", "event_url") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
  let name =  req.body.name;
  let non_profit_id = +(req.body.non_profit_id);
  let description = req.body.description;
  let address = req.body.address;
  let city = req.body.city;
  let zip_code = req.body.zip_code;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let event_url = req.body.event_url;

  if(req.user.id === non_profit_id){
    pool.query(queryText, [name, non_profit_id, description, address, city, zip_code, start_date, end_date, start_time, end_time, event_url])
    .then((result) => {
      console.log('returning results for event:', result.rows);
      res.send(result.rows)
    })
    .catch ((error) => {
      console.log('error in addEvent POST', error)
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
})

module.exports = router;