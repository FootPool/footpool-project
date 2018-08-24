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

let client;
io.on("connection", socket => {
  client = socket;
});

////GET MATCH_ID FROM DATABASE

////GLOBAL DATA FOR SCORE GENERATOR
let homeTeam = 0;
let awayTeam = 0;

////CREATE FIXTURE OBJECT
function createFixtureObject(matches) {
  const scores = matches.map(match => {
    return {
      gameId: match.id,
      matchId: match.match_id,
      home_team: match.home_team,
      away_team: match.away_team,
      home: 0,
      away: 0
    };
  });

  return scores;
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
  let randomNumber = randomInt(1, 150);

  if (randomNumber < 3) {
    scores[1].home += 1;
    console.log("Game 1 HOME", scores[1].home);
  } else if (randomNumber >= 3 && randomNumber < 5) {
    scores[1].away += 1;
    console.log("Game 1 AWAY", scores[1].away);
  } else if (randomNumber >= 6 && randomNumber < 8) {
    scores[2].home += 1;
    console.log("Game 2 HOME", scores[2].home);
  } else if (randomNumber >= 10 && randomNumber < 12) {
    scores[2].away += 1;
    console.log("Game 2 AWAY", scores[2].away);
  } else if (randomNumber >= 14 && randomNumber < 16) {
    scores[3].home += 1;
    console.log("Game 2 HOME", scores[3].home);
  } else if (randomNumber >= 18 && randomNumber < 20) {
    scores[3].away += 1;
    console.log("Game 2 AWAY", scores[3].away);
  } else if (randomNumber >= 22 && randomNumber < 24) {
    scores[4].home += 1;
    console.log("Game 2 HOME", scores[4].home);
  } else if (randomNumber >= 26 && randomNumber < 28) {
    scores[4].away += 1;
    console.log("Game 2 AWAY", scores[4].away);
  } else if (randomNumber >= 30 && randomNumber < 32) {
    scores[5].home += 1;
    console.log("Game 2 HOME", scores[5].home);
  } else if (randomNumber >= 34 && randomNumber < 36) {
    scores[5].away += 1;
    console.log("Game 2 AWAY", scores[5].away);
  } else if (randomNumber >= 38 && randomNumber < 40) {
    scores[6].home += 1;
    console.log("Game 2 HOME", scores[6].home);
  } else if (randomNumber >= 41 && randomNumber < 43) {
    scores[6].away += 1;
    console.log("Game 2 AWAY", scores[6].away);
  } else if (randomNumber >= 44 && randomNumber < 46) {
    scores[7].home += 1;
    console.log("Game 2 HOME", scores[7].home);
  } else if (randomNumber >= 46 && randomNumber < 48) {
    scores[7].away += 1;
    console.log("Game 2 AWAY", scores[7].away);
  } else if (randomNumber >= 88 && randomNumber < 90) {
    scores[8].away += 1;
    console.log("Game 2 AWAY", scores[8].away);
  } else if (randomNumber >= 48 && randomNumber < 50) {
    scores[8].home += 1;
    console.log("Game 2 HOME", scores[8].home);
  } else if (randomNumber >= 50 && randomNumber < 52) {
    scores[9].away += 1;
    console.log("Game 2 AWAY", scores[9].away);
  } else if (randomNumber >= 52 && randomNumber < 54) {
    scores[9].home += 1;
    console.log("Game 2 HOME", scores[9].home);
  } else if (randomNumber >= 54 && randomNumber < 56) {
    scores[0].away += 1;
    console.log("Game 2 AWAY", scores[0].away);
  } else if (randomNumber >= 56 && randomNumber < 58) {
    scores[0].home += 1;
    console.log("Game 2 HOME", scores[0].home);
  } else {
    homeTeam = homeTeam;
    awayTeam = awayTeam;
  }
  return scores;
}

////STARTS THE GAME
function runGame(bets, scores) {
  let counter = 0;
  const interval = setInterval(function() {
    if (counter < 46 || counter > 55) {
      updateScore(scores);
      client.emit("matchDetails", { scores, bets });
    }

    console.log("count:-", counter);
    counter++;
    if (counter > 100) {
      clearInterval(interval);
      console.log("GAME COMPLETE", scores);
      ////UPDATING THE FINAL SCORE TO DATABASE
      scores.forEach(score => {
        console.log("score:", score);
        let outcome = "";
        if (score.home > score.away) {
          outcome = "HOME_TEAM";
        } else if (score.home < score.away) {
          outcome = "AWAY_TEAM";
        } else {
          outcome = "DRAW";
        }
        db.none(
          `UPDATE game SET home_score = $1, away_score = $2, status = $3, winner = $4 WHERE match_id = $5`,
          [score.home, score.away, "completed", outcome, score.matchId]
        )
          .then(function() {
            homeTeam = 0;
            awayTeam = 0;
          })
          .catch(err => console.log("ERROR saving final score in db", err));
      });
    }
  }, 300);
}

// AUTHENTICATION FUNCTIONS
function getUserByUsername(username) {
  return db
    .one(
      `SELECT * FROM fpuser
    WHERE username = $1`,
      [username]
    )
    .catch(error => console.log(error.message));
}

function getUserById(id) {
  return db
    .one(
      `SELECT id, username, email FROM fpuser
    WHERE id = $1`,
      [id]
    )
    .catch(error => console.log(error.message));
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
  const { poolId } = req.body;

  let scores;

  db.many(
    `SELECT distinct(match_id), id, match_id, home_team, away_team FROM game 
    WHERE pool_id = $1`,
    [poolId]
  )
    .then(data => {
      scores = createFixtureObject(data);
    })
    .then(() => {
      return db.many(
        `SELECT distinct(bet.user_id), bet.pool_id, game.match_id, bet.bet, fpuser.username, game.winner FROM bet, game, fpuser
        WHERE fpuser.id=bet.user_id
        AND game.match_id=bet.match_id
        AND bet.pool_id = $1`,
        [poolId]
      );
    })
    .then(bets => {
      runGame(bets, scores);
    })
    .catch(err => console.log(err));
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
