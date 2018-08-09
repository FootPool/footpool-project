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
const socket = require("socket.io");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

const app = express();

const server = require("http").createServer(app);

const io = socket(server);

const db = pgp({
  host: "localhost",
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
});

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
db.many(`SELECT match_id FROM game`).then(data => {
  // console.log(data);
  createFixtureObject(data);
  // console.log(scores);

  // console.log(wow);
  // console.log(scores[wow[1]]);
});

////GLOBAL DATA FOR SCORE GENERATOR
let counter = 0;
let homeTeam = 0;
let awayTeam = 0;
let scores = {};

////CREATE FIXTURE OBJECT
function createFixtureObject(matchId) {
  // console.log("this is match id", matchId);
  matchId.map(item => {
    // console.log(item.match_id);
    scores[item.match_id] = { home: 0, away: 0 };
  });
  // console.log(scores);
}

////CREATE RANDOM NUMBER
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

////UPDATES THE SCORE FOR HOME OR AWAY
function updateScore(scores) {
  // console.log(scores);
  const wow = Object.keys(scores);
  // console.log(wow);
  ////GENERATOR SCORE
  let randomNumber = randomInt(1, 90);

  if (randomNumber < 3) {
    homeTeam += 1;
    scores[wow[1]].home += 1;
    console.log("Game 1 HOME", scores[wow[1]].home);
    // console.log("homeTeam: ", homeTeam);
  } else if (randomNumber > 8 && randomNumber < 11) {
    awayTeam += 1;
    scores[wow[1]].away += 1;
    console.log("Game 1 AWAY", scores[wow[1]].away);
    // console.log("awayTeam: ", awayTeam);
  } else if (randomNumber > 85) {
    scores[wow[2]].home += 1;
    console.log("Game 2 HOME", scores[wow[2]].home);
  } else if (randomNumber > 11 && randomNumber < 13) {
    scores[wow[2]].away += 1;
    console.log("Game 2 AWAY", scores[wow[2]].away);
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
      status = "LIVE";
    } else {
      status = "HALF-TIME";
    }
    counter++;
    if (counter > 100) {
      clearInterval(interval);
      console.log("GAME COMPLETE", scores);

      ////UPDATING THE FINAL SCORE TO DATABASE
      Object.keys(scores).map(item => {
        // console.log(scores[item].home);
        db.none(
          "UPDATE game SET home_score = $1, away_score = $2 WHERE id = $3",
          [scores[item].home, scores[item].away, item]
        ).then(function() {
          counter = 0;
          homeTeam = 0;
          awayTeam = 0;
        });
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
        let matchData = {
          home: homeTeam,
          away: awayTeam
        };
        socket.emit("matchDetails", scores);
      } else {
        clearInterval(repeater);
      }
      // count++;
    }, 100);
  });
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

// ROUTES
app.use("/api", apiRouter(db));
app.use("/", indexRouter);

// GET POOLS TO DISPLAY TO USER

app.get("/displaypools", function(req, res) {
  db.any(`SELECT * FROM pool`)
    .then(data => {
      res.json(data);
    })
    .catch(error => res.json({ error: error.message }));
});

app.use("/api", apiRouter(db));
app.use("/", indexRouter);

// PROTECTED ROUTES
app.get("/*", isLoggedIn, function(req, res) {
  const user = req.user ? req.user : { id: null };
  const json = JSON.stringify(user);
  res.render("index", { user, json });
});

server.listen(8080, function() {
  console.log("Listening on port 8080");
});
