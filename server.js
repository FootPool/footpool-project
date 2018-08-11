const pgp = require("pg-promise")();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config({ path: "./.envrc" });
const fetch = require("node-fetch");
const app = express();
// const io = require("socket.io");
const socket = require("socket.io");
const server = require("http").createServer(app);
// const socket = io(server);
const io = socket(server);

const db = pgp({
  host: "localhost",
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
});

console.log(process.env.DATABASE);

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");
app.use("/static", express.static("static"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  require("express-session")({
    secret: "some random text #^*%!!", // used to generate session ids
    resave: false,
    saveUninitialized: false
  })
);

// db.many(`SELECT match_id FROM game`).then(data => {
//   console.log(data);
//   generateScores(data);
// });

// function generateScores() {}

//// generate Function for virtual scores

// function doEverything(gameId) {
//   let counter = 0;
//   let homeTeam = 0;
//   let awayTeam = 0;

//   function randomInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
//   }

//   function sendResult(matchId) {
//     if (homeTeam > awayTeam) {
//       db.none(
//         `UPDATE game
//        SET winner = 'HOME_TEAM' WHERE match_id = $1`,
//         [matchId]
//       );
//     } else if (awayTeam > homeTeam) {
//       db.none(
//         `UPDATE game
//        SET winner = 'AWAY_TEAM' WHERE match_id = $1`,
//         [matchId]
//       );
//     } else {
//       db.none(
//         `UPDATE game
//        SET winner = 'DRAW' WHERE match_id = $1`,
//         [matchId]
//       );
//     }
//   }

//   function fullTimeStatus(matchId) {
//     db.none(`UPDATE game SET status = 'completed' WHERE match_id = $1`, [
//       matchId
//     ]);
//   }

//   function runSecondHalf(matchId) {
//     const interval = setInterval(function() {
//       console.log(`counter ${counter}`);
//       if (counter < 90) {
//         runGame(matchId);
//         // console.log(homeTeam, awayTeam);
//       } else {
//         clearInterval(interval);
//         console.log("FULL-TIME");
//         sendResult(matchId);
//         fullTimeStatus(matchId);
//       }
//       counter++;
//     }, 100);
//   }

//   function runHalfTime(matchId) {
//     const interval = setInterval(function() {
//       if (counter === 46) {
//         runSecondHalf(matchId);
//       } else {
//         clearInterval(interval);
//       }
//       counter++;
//     }, 5000);
//   }

//   function runGame(matchId) {
//     let randomNumber = randomInt(1, 90);
//     console.log(homeTeam, awayTeam);
//     if (randomNumber < 3) {
//       db.none(
//         `UPDATE game SET home_score = home_score + 1 WHERE match_id = $1`,
//         [matchId]
//       );
//       homeTeam += 1;
//     } else if (randomNumber > 8 && randomNumber < 11) {
//       db.none(
//         `UPDATE game SET away_score = away_score + 1 WHERE match_id = $1`,
//         [matchId]
//       );
//       awayTeam += 1;
//     } else {
//       homeTeam = homeTeam;
//       awayTeam = awayTeam;
//     }
//   }
//   //// socket connection

//   function runFirstHalf(matchId) {
//     const interval = setInterval(function() {
//       console.log(`counter ${counter}`);
//       if (counter < 45) {
//         runGame(matchId);
//         // console.log(homeTeam, awayTeam);
//       } else {
//         clearInterval(interval);
//         console.log("HALF-TIME");
//         runHalfTime(matchId);
//       }
//       counter++;
//     }, 100);
//   }

//   function startGame(matchId) {
//     db.none(`UPDATE game SET status = 'live' WHERE match_id = $1`, [matchId]);
//     runGame(matchId);
//     console.log("KICK-OFF DB");
//     runFirstHalf(matchId);
//   }

//   function runningGame(gameId) {
//     // console.log("ive started");
//     db.one(`SELECT match_id FROM game WHERE id = $1`, [gameId]).then(data => {
//       // startGame(data.match_id);
//       startGame(data.match_id);
//     });
//   }
//   runningGame(gameId);
// }

// function sendToCLient() {
//   io.on("connection", socket => {
//     // console.log("i am connected", gameId);
//     let dbRefCount = 0;
//     const interval = setInterval(() => {
//       // console.log("inside interval");
//       if (dbRefCount < 90) {
//         // generate scores
//         // send scores to browser
//         // after game end, save results to db
//         db.many(`SELECT * FROM game`).then(data => {
//           // console.log("inside db call", gameId);
//           socket.emit("matchDetails", data);
//         });
//       } else {
//         clearInterval(interval);
//       }
//       dbRefCount++;
//     }, 1000);
//   });
// }

let counter = 0;
let homeTeam = 0;
let awayTeam = 0;
let status = "";

//// Update the database with final scores

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateScore() {
  let randomNumber = randomInt(1, 90);
  if (randomNumber < 3) {
    homeTeam += 1;
    console.log("homeTeam: ", homeTeam);
  } else if (randomNumber > 8 && randomNumber < 11) {
    awayTeam += 1;
    console.log("awayTeam: ", awayTeam);
  } else {
    homeTeam = homeTeam;
    awayTeam = awayTeam;
  }
}

function runGame(gameId) {
  const interval = setInterval(function() {
    if (counter < 46 || counter > 55) {
      updateScore();
      status = "LIVE";
    } else {
      status = "HALF-TIME";
    }
    counter++;
    if (counter > 100) {
      clearInterval(interval);
      console.log("ive finished");
      db.none("UPDATE game SET home_score = $1 WHERE id = $2", [
        homeTeam,
        gameId
      ]);
    }
  }, 100);
}

///// OUR SOCKET CONNECTION

io.on("connection", socket => {
  let count = 0;
  const repeater = setInterval(function() {
    if (count < 100) {
      let matchData = {
        home: homeTeam,
        away: awayTeam
      };
      socket.emit("matchDetails", matchData);
    } else {
      clearInterval(repeater);
    }
    count++;
  }, 100);
});
// AUTHENTICATION FUNCTIONS

function getUserByUsername(username) {
  return db.one(
    `SELECT * FROM fpuser
    WHERE username = $1`,
    [username]
  );
}

function getUserById(id) {
  return db.one(
    `SELECT id, username, email FROM fpuser
    WHERE id = $1`,
    [id]
  );
}

function isLoggedIn(req, res, next) {
  if (process.env.NODE_ENV === "development" || (req.user && req.user.id)) {
    next();
  } else {
    res.redirect("/login");
  }
}

// SERIALISE USER
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// DESERIALISE USER
passport.deserializeUser(function(id, done) {
  getUserById(id).then(user => {
    done(null, user);
  });
});

// INITIALISE PASSPORT AND SESSION

app.use(passport.initialize());
app.use(passport.session());

// RENDER PAGES

app.get("/", function(req, res) {
  res.render("homepage");
});

app.get("/signup", function(req, res) {
  res.render("signup");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/reset", function(req, res) {
  res.render("reset");
});

// AUTHENTICATE LOG IN

passport.use(
  new LocalStrategy(function(username, password, done) {
    getUserByUsername(username)
      .then(user => {
        if (!user) return done(null, false);

        bcrypt
          .compare(password, user.password)
          .then(matches => (matches ? done(null, user) : done(null, false)))
          .catch(error => done(error, false));
      })
      .catch(error => done(error, false));
  })
);

// ADMIN

app.get("/admin", function(req, res) {
  res.render("admin");
});

// LOG IN

app.get("login", function(req, res) {
  res.render("login", {});
});

app.post("/login", passport.authenticate("local", { session: true }), function(
  req,
  res
) {
  res.status(200).end();
});

// LOG OUT

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// SIGN UP

app.get("/signup", function(req, res) {
  res.render("signup");
});

app.post("/signup", function(req, res) {
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

app.post("/admin", function(req, res) {
  const { gameId } = req.body;
  // doEverything(gameId);
  // sendToCLient();
  runGame(gameId);
});

// CREATE POOL

app.post("/pool", function(req, res) {
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

app.post("/placebet", function(req, res) {
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

app.get("/isuserinpool/:userId/:poolName", function(req, res) {
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

// PROTECTED ROUTES

app.get("/*", isLoggedIn, function(req, res) {
  res.render("index", { user: req.user });
});

server.listen(8080, function() {
  console.log("Listening on port 8080");
});
