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
router.get('/eventVolunteers', (req,res) => {
  let queryText = ``
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;