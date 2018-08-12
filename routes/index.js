const express = require("express");

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
  res.render("homepage");
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
