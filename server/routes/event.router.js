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
router.post('/addEvent', rejectUnauthenticated, (req, res) => {
  console.log('user id is:', req.user.id);
  console.log('non_profit_id is:', req.body.non_profit_id);
  
  if (req.user.id === req.body.non_profit_id) {
  let queryText = `INSERT INTO "event" ("name", "non_profit_id", "description", "address", "city", "zip_code",
    "start_date", "end_date", "start_time", "end_time", "event_url", "state") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;`;
  let name =  req.body.name;
  let non_profit_id = req.body.non_profit_id;
  let description = req.body.description;
  let address = req.body.address;
  let city = req.body.city;
  let zip_code = req.body.zip_code;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let state = req.body.state;
  let event_url = req.body.event_url;
  console.log(req.body)

    pool.query(queryText, [name, non_profit_id, description, address, city, zip_code, start_date, end_date, start_time , end_time, event_url, state])
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
});

//updates past event details for "add new event" 
router.put('/addPastEvent', rejectUnauthenticated, (req, res) => {
  let queryText = `UPDATE "event" SET "name" = $1, "description" = $2, "address" = $3, "city" = $4, "state" = $5, "zip_code" = $6, "start_date" = $7, "end_date" = $8, 
                    "start_time" = $9, "end_time" = $10, "event_url" = $11 WHERE "id" =$12 RETURNING *;`;

  let name = req.body.name;
  let description = req.body.description;
  let address = req.body.address;
  let city = req.body.city;
  let state = req.body.state;
  let zip_code = req.body.zip_code;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let event_url = req.body.event_url;
  let id = req.body.past_event_id;

  pool.query(queryText, [name, description, address, city, state, zip_code, start_date, end_date, start_time, end_time, event_url, id ])
  .then((result) => {
    console.log('update past event returns all:', result.rows);
    
    res.send(result.rows)
  })
  .catch((error) => {
    console.log('error in update past event', error);
    res.sendStatus(500)
  })
})

//edits event details
router.put('/editEvent', rejectUnauthenticated, (req,res) => {
  if (req.user.id === non_profit_id) {
let queryText = `UPDATE "event" SET "name" = $1, "description" = $2, "address" = $3, "city" = $4, "zip_code" = $5, "start_date" = $6, 
  "end_date" = $7, "event_url" = $8, "state" = $9, "start_time" = $10, "end_time" = $11 WHERE "id" = $12;`;
  let name = req.body.name;
  let description = req.body.description;
  let address = req.body.address;
  let city = req.body.city;
  let zip_code = req.body.zip_code;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let event_url = req.body.event_url;
  let state = req.body.states;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let id = req.body.id;

  pool.query(queryText, [name, description, address, city, zip_code, start_date, end_date, event_url, state, start_time, end_time, id])
      .then((result) => {
        res.sendStatus(200)
      })
      .catch((error) => {
        console.log('error in editevent put', error)
        res.sendStatus(500)
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;