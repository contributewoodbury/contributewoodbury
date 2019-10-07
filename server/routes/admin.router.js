const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//updates nonprofit's approval to true
router.put('/approve/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.name === 'Admin') {
        let queryText = `UPDATE "nonprofit" SET "is_approved" = 'true' WHERE "id" = $1;`;
        let id = req.params.id
        pool.query(queryText, [id])
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log('error in updating approval for nonprofit', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403)
    }
})

//deletes a nonprofit when their request is denied
router.delete('/decline/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.name === 'Admin') {
        let queryText = `DELETE FROM "nonprofit" WHERE "id" = $1;`;
        let id = req.params.id;
        pool.query(queryText, [id])
            .then((result) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error in deleted declined requests for nonprofits', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403)
    }
});

//deletes Nonprofits and all their related data (events, roles, etc)
router.delete('/delete/:id', rejectUnauthenticated, async (req, res) => {
    if (req.user.name === 'Admin') {
        let queryText = `SELECT array_agg("id") AS "event_ids" FROM "event" WHERE "non_profit_id" = $1;`;
        const conn = await pool.connect();
        pool.query(queryText, [req.params.id])
            .then(async (results) => {
                let event_ids = results.rows[0].event_ids;
                console.log(event_ids);
                try {
                    await conn.query(`BEGIN`);
                    for (const id of event_ids) {
                        console.log(id);
                        let queryText2 = `SELECT array_agg("id") AS "role_ids" FROM "role" WHERE "event_id" = $1;`;
                        await conn.query(queryText2, [id])
                            .then(async (results) => {
                                console.log(results.rows);
                                let role_ids = results.rows[0].role_ids;
                                for (const r_id of role_ids) {
                                    console.log(r_id);
                                    let queryText3 = `DELETE FROM "volunteer_role" WHERE "role_id" = $1;`;
                                    await conn.query(queryText3, [r_id]);
                                }
                            })
                            .catch((error) => {
                                console.log('error in second pool', error);
                                res.sendStatus(500);
                            });
                    }
                    for (const e_id of event_ids) {
                        console.log(e_id);
                        let queryText4 = `DELETE FROM "role" WHERE "event_id" = $1;`;
                        await conn.query(queryText4, [e_id]);
                    }
                    await conn.query(`DELETE FROM "event" WHERE "non_profit_id" = $1;`, [req.params.id]);
                    await conn.query(`DELETE FROM "nonprofit" WHERE "id" = $1`, [req.params.id]);
                    await conn.query(`COMMIT;`);
                    res.sendStatus(200);
    } catch (error) {
    console.log(error);
    await conn.query(`ROLLBACK;`);
    res.sendStatus(500);
} finally {
    // finally will always run whether good or bad. 
    //tells our connection we are done and frees it to do other things
    conn.release();
}
        })
        .catch ((error) => {
    console.log('error in big delete', error);
    res.sendStatus(500);
})
    } else {
    res.sendStatus(403);
}
});

// router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
//     let queryText = `DELETE FROM "nonprofit" WHERE "id" = $1;`;
//     if(req.user.name === 'Admin'){
//         pool.query(queryText, [req.params.id])
//         .then(() => {
//             res.sendStatus(200);
//         })
//         .catch((error) => {
//             console.log('error in big delete', error);
//             res.sendStatus(500);
//         })
//     }
// });

//gets the nonprofit requests from the database
router.get('/requests', rejectUnauthenticated, (req, res) => {
    if (req.user.name === 'Admin') {
        let queryText = `SELECT * FROM "nonprofit" WHERE "is_approved" = 'false';`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows)
            })
            .catch((error) => {
                console.log('error in getting requested for nonprofits', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403)
    }
});

// selects all nonprofits from the database and sorts the by those whose last confirm date is over a year old.
router.get('/directory', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "nonprofit" WHERE NOT "name" = 'Admin' ORDER BY "last_confirmed"`;
    if (req.user.name === 'Admin') {
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('error in admin directory GET', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;