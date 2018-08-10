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
const io = require("socket.io");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

const app = express();
const server = require("http").createServer(app);
const socket = io(server);
socket.on("connection", function(client) {
  client.on("event", function(data) {
    console.log("data:", data);
  });
  client.on("join", function(data) {
    console.log("join: data =", data);
    client.emit("message", "Howdy from the server!");
  });
  client.on("disconnect", function() {
    console.log("disconnected");
  });
  // const dummy = setInterval(() => {
  //   const score = 10;
  //   client.emit("message", { score });
  // }, 1000);
});

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

// PROTECTED ROUTES
app.get("/*", isLoggedIn, function(req, res) {
  const user = req.user ? req.user : { id: null };
  const json = JSON.stringify(user);
  res.render("index", { user, json });
});

server.listen(8080, function() {
  console.log("Listening on port 8080");
});
