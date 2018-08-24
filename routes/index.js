const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

function isNotLoggedIn(req, res, next) {
  if (process.env.NODE_ENV === "development" || (req.user && req.user.id)) {
    res.redirect("/choosepool");
  } else {
    next();
  }
}

// GET HOME PAGE
router.get("/", isNotLoggedIn, function(req, res) {
  let fixtures = {};
  fetch(
    `http://api.football-data.org/v2/competitions/2021/matches?matchday=2`,
    {
      headers: {
        "X-Auth-Token": "db40501154f6451aaa0c34fb63296bb1"
      }
    }
  )
    .then(res => (res.ok ? res.json() : Promise.reject(res)))
    .then(data => {
      res.render("homepage", { matches: data.matches });
    })
    .catch(err => console.log(err));
});
//GET SIGN UP
router.get("/signup", isNotLoggedIn, function(req, res) {
  res.render("signup");
});

// GET LOGIN
router.get("/login", isNotLoggedIn, function(req, res) {
  res.render("login", {});
});

// GET RESET
router.get("/reset", isNotLoggedIn, function(req, res) {
  res.render("reset");
});

// LOG OUT
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
