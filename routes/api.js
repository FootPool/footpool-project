const express = require("express");
const pgp = require("pg-promise")();
const passport = require("passport");
const bcrypt = require("bcrypt");

const db = pgp({
  host: "localhost",
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
});

const router = express.Router();

// POST LOG IN

router.post(
  "/login",
  passport.authenticate("local", { session: true }),
  function(req, res) {
    res.status(200).end();
  }
);

// POST SIGN UP

router.post("/signup", function(req, res) {
  const { newUsername, newPassword, newEmail } = req.body;

  const SALT_ROUNDS = 12;

  bcrypt
    .genSalt(SALT_ROUNDS)
    .then(salt => {
      return bcrypt.hash(newPassword, salt);
    })
    .then(hashedPassword => {
      db.none(
        `INSERT INTO fpuser(
          username, password, email, score
        )
        VALUES($1, $2, $3, 0) RETURNING id`,
        [newUsername, hashedPassword, newEmail]
      )
        .then(data => {
          res.status(200).end();
        })
        .catch(error => res.json({ error: error.message }));
    });
});

// CREATE POOL
router.post("/pool", function(req, res) {
  const { poolName, matchWeek } = req.body;

  let poolId = "";

  function updatePoolId(id) {
    poolId = id;
  }

  db.one(
    `INSERT INTO pool(poolname, date_created, match_week)
    VALUES($1, current_timestamp, $2) RETURNING id`,
    [poolName, matchWeek]
  )
    .then(data => {
      updatePoolId(data.id);
    })
    .then(() => {
      return fetch(
        `http://api.football-data.org/v2/competitions/2021/matches?matchday=${matchWeek}`,
        {
          headers: {
            "X-Auth-Token": "db40501154f6451aaa0c34fb63296bb1"
          }
        }
      );
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      return db.tx(t => {
        const queries = data.matches.map(fixture => {
          t.one(
            `INSERT INTO game(pool_id, home_team, away_team, match_id)
            VALUES($1, $2, $3, $4) RETURNING id`,
            [poolId, fixture.homeTeam.name, fixture.awayTeam.name, fixture.id]
          );
        });
        return t.batch(queries);
      });
    })
    .then(data => {
      res.json({
        poolId
      });
    })
    .catch(error => {
      res.json({ error: error.message });
    });
});

// PLACE BETS
router.post("/placebet", function(req, res) {
  const { user, pool, guesses } = req.body;

  db.one(
    `SELECT id FROM pool
    WHERE poolname = $1`,
    [pool]
  )
    .then(data => {
      return db.tx(t => {
        const results = Object.entries(guesses).map(guess =>
          t.none(
            `INSERT INTO bet(user_id, bet, match_id, pool_id)
            VALUES ($1, $2, $3, $4)`,
            [user.id, guess[1], parseInt(guess[0], 10), data.id]
          )
        );
        return t.batch(results);
      });
    })
    .then(data => {
      res.status(200).end();
    })
    .catch(error => {
      res.json({ error: error.message });
    });
});

// VALIDATE USER IN POOL
router.get("/validate/:userId/:poolName", function(req, res) {
  const userId = req.params.userId;
  const poolName = req.params.poolName;

  db.one(
    `SELECT count(*) FROM bet, pool
      WHERE bet.user_id = $1
      AND bet.pool_id = pool.id
      AND pool.poolName = $2`,
    [userId, poolName]
  )
    .then(data => {
      res.json({
        hasBets: data.count !== "0"
      });
    })
    .catch(error => {
      res.json({ error: error.message });
    });
});

// GET POOLS TO DISPLAY TO USER
router.get("/displaypools", function(req, res) {
  db.any(`SELECT * FROM pool`)
    .then(data => {
      res.json(data);
    })
    .catch(error => res.json({ error: error.message }));
});

module.exports = router;
