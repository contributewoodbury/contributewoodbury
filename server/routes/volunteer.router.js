const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//gets the roles for a specifc event
router.get('/role/:id', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "role" WHERE "event_id" = $1;`;
  pool.query(queryText, [req.params.id])
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('error in volunteer roles get', error);
    res.sendStatus(500);
  });
});


//gets all the volunteers for a specific event
router.get('/eventVolunteers/:id', rejectUnauthenticated, (req,res) => {
  let queryText = `SELECT "volunteer_role".name, "volunteer_role".city, "volunteer_role".zip_code, 
      "volunteer_role".address, "volunteer_role".start_time, "role".name AS "role_name" FROM "volunteer_role"
      JOIN "role" ON "role".id = "volunteer_role".role_id
      WHERE "role".event_id = $1;`;
  let id = req.params.id
  pool.query(queryText, [id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error in eventVolunteers get', error)
        res.sendStatus(500); 
      })
})

//gets all the volunteers for a specific event
router.get('/eventVolunteers/:id', rejectUnauthenticated, (req,res) => {
  let queryText = `SELECT "volunteer_role".name, "volunteer_role".city, "volunteer_role".zip_code, 
      "volunteer_role".address, "volunteer_role".start_time, "role".name AS "role_name" FROM "volunteer_role"
      JOIN "role" ON "role".id = "volunteer_role".role_id
      WHERE "role".event_id = $1;`;
  let id = req.params.id
  pool.query(queryText, [id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error in eventVolunteers get', error)
        res.sendStatus(500); 
      })
})

//adds volunteer roles for specific events
router.post('/addVolunteers/:id', rejectUnauthenticated, (req, res) => {
  let queryText = `INSERT INTO "role" ("name", "description", "number_needed", "start_time", "end_time", "date", "event_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  let name = req.body.name;
  let description = req.body.description;
  let number_needed = req.body.number_needed;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let date = req.body.date;
  let event_id= req.params.id;
  pool.query(queryText, [name, description, number_needed,start_time, end_time, date, event_id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in addVolunteers post', error)
    })
});

module.exports = router;