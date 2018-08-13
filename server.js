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

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

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

// console.log(process.env.DATABASE);

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");
app.use(cookieParser());
app.use(
  require("express-session")({
    secret: "some random text #^*%!!", // used to generate session ids
    resave: false,
    saveUninitialized: false
  })
);
////GET MATCH_ID FROM DATABASE
db.many(`SELECT distinct(match_id), id, match_id, home_team, away_team FROM game WHERE pool_id = 11`).then(data => {
  // console.log(data);
  createFixtureObject(data);
  // console.log(scores);

  // console.log(gameIds);
  // console.log(scores[gameIds[1]]);
});

////GLOBAL DATA FOR SCORE GENERATOR
let counter = 0;
let homeTeam = 0;
let awayTeam = 0;
let scores = {};

////CREATE FIXTURE OBJECT
function createFixtureObject(matches) {
  scores = matches.map(match => {
    // console.log(item.match_id);
    return {gameId: match.id, matchId:match.match_id, home_team: match.home_team, away_team: match.away_team, home: 0, away: 0 };
  });
}

////CREATE RANDOM NUMBER
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

////UPDATES THE SCORE FOR HOME OR AWAY
function updateScore(scores) {
  // console.log(scores);
  const gameIds = scores.map(score => score.gameId);
  // console.log(gameIds);
  ////GENERATOR SCORE
  let randomNumber = randomInt(1, 90);

  if (randomNumber < 3) {
    scores[1].home += 1;
    console.log("Game 1 HOME", scores[1].home);
  } else if (randomNumber >= 3 && randomNumber <5) {
    scores[1].away += 1;
    console.log("Game 1 AWAY", scores[1].away);
  } else if (randomNumber >= 6 && randomNumber <9) {
    scores[2].home += 1;
    console.log("Game 2 HOME", scores[2].home);
  } else if (randomNumber >= 10 && randomNumber <13) {
    scores[2].away += 1;
    console.log("Game 2 AWAY", scores[2].away);
  } else if (randomNumber >= 14 && randomNumber <17) {
    scores[3].home += 1;
    console.log("Game 2 HOME", scores[3].home);
  } else if (randomNumber > 18 && randomNumber < 21) {
    scores[3].away += 1;
    console.log("Game 2 AWAY", scores[3].away);
  } else if (randomNumber >= 22 && randomNumber <25) {
    scores[4].home += 1;
    console.log("Game 2 HOME", scores[4].home);
  } else if (randomNumber > 26 && randomNumber < 29) {
    scores[4].away += 1;
    console.log("Game 2 AWAY", scores[4].away);
  } else if (randomNumber >= 30 && randomNumber <33) {
    scores[5].home += 1;
    console.log("Game 2 HOME", scores[5].home);
  } else if (randomNumber >= 34 && randomNumber <37) {
    scores[5].away += 1;
    console.log("Game 2 AWAY", scores[5].away);
  } else if (randomNumber >= 38 && randomNumber <41) {
    scores[6].home += 1;
    console.log("Game 2 HOME", scores[6].home);
  } else if (randomNumber > 11 && randomNumber < 13) {
    scores[6].away += 1;
    console.log("Game 2 AWAY", scores[6].away);
  } else if (randomNumber > 85) {
    scores[7].home += 1;
    console.log("Game 2 HOME", scores[7].home);
  } else if (randomNumber > 11 && randomNumber < 13) {
    scores[7].away += 1;
    console.log("Game 2 AWAY", scores[7].away);
  } else if (randomNumber > 11 && randomNumber < 13) {
    scores[8].away += 1;
    console.log("Game 2 AWAY", scores[8].away);
  } else if (randomNumber > 85) {
    scores[8].home += 1;
    console.log("Game 2 HOME", scores[8].home);
  } else if (randomNumber > 11 && randomNumber < 13) {
    scores[9].away += 1;
    console.log("Game 2 AWAY", scores[9].away);
  } else if (randomNumber > 85) {
    scores[9].home += 1;
    console.log("Game 2 HOME", scores[9].home);
  } else if (randomNumber > 11 && randomNumber < 13) {
    scores[0].away += 1;
    console.log("Game 2 AWAY", scores[0].away);
  } else if (randomNumber > 85) {
    scores[0].home += 1;
    console.log("Game 2 HOME", scores[0].home);
  } else {
    homeTeam = homeTeam;
    awayTeam = awayTeam;
  }
}

////STARTS THE GAME
function runGame(gameId) {
  const interval = setInterval(function() {
    if (counter < 46 || counter > 55) {
      updateScore(scores);
    //   status = "LIVE";
    // } else {
    //   status = "HALF-TIME";
    }
    counter++;
    if (counter > 100) {
      clearInterval(interval);
      console.log("GAME COMPLETE", scores);
      ////UPDATING THE FINAL SCORE TO DATABASE
      scores.forEach(score => {
        let outcome = ''
        if (score.home > score.away) {
          outcome = "home_team"
        } else if (score.home < score.away) {
          outcome = "away_team"
          } else {
            outcome = "DRAW"
          }
        db.none(
          `UPDATE game SET home_score = $1, away_score = $2, status = $3, winner = $4 WHERE match_id = $5`,
          [score.home, score.away, 'completed', outcome, score.gameId ]
        ).then(function() {
          counter = 0;
          homeTeam = 0;
          awayTeam = 0;
        }).catch(err => console.log('ERROR saving final score in db', err))
    });
   }
    }, 100);
  }

/////SOCKET CONNECTION
function socketConnection() {
  io.on("connection", socket => {
    // let count = 0;
    const repeater = setInterval(function() {
      if (counter < 100) {
        getBets().then(bets => {
          socket.emit("matchDetails", {scores, bets});
        })
      } else {
        clearInterval(repeater);
      }
      // count++;
    }, 100);
  });
}

///////GET BETS FROM DATABASE

function getBets (){
  return db.many(`SELECT user_id, game_id, bet, fpuser.username, game.* FROM bet 
                  INNER JOIN fpuser on fpuser.id = bet.user_id
                  INNER JOIN game on game.id = bet.game_id
                  WHERE bet.pool_id = 11`).then(data => {
    // console.log(data);
    return data;
  }).catch(err => console.log(err));
  // console.log(scores);

  // console.log(gameIds);
  // console.log(scores[gameIds[1]]);
}

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

// ROUTES
app.use("/api", apiRouter(db));
app.use("/", indexRouter);

// ADMIN
app.get("/admin", function(req, res) {
  res.render("admin");
});

app.post("/admin", function(req, res) {
  const { gameId } = req.body;
  runGame(gameId);
  socketConnection();
  // console.log(scores);
});

// PROTECTED ROUTES
app.get("/*", isLoggedIn, function(req, res) {
  const user = req.user ? req.user : { id: null };
  const json = JSON.stringify(user);
  res.render("index", { user, json });
});

server.listen(8080, function() {
  console.log("Listening on port 8080");
});
