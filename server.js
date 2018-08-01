const pgp = require("pg-promise")();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const bcrypt = require("bcrypt");

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
    `SELECT * FROM fpuser
    WHERE id = $1`,
    [id]
  );
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

app.get("/app", function(req, res) {
  res.render("index");
});

// AUTHENTICATE LOG IN

passport.use(
  new LocalStrategy(function(username, password, done) {
    getUserByUsername(username)
      .then(user => {
        console.log("user: ", user);
        if (!user) return done(null, false);

        bcrypt
          .compare(password, user.password)
          .then(matches => (matches ? done(null, user) : done(null, false)))
          .catch(error => done(error, false));
      })
      .catch(error => done(error, false));
  })
);

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

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/users", function(req, res) {
  db.any("SELECT * FROM fpuser")
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
