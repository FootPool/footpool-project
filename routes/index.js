const express = require("express");

const router = express.Router();

// GET HOME PAGE
router.get("/", function(req, res) {
  res.render("homepage");
});

//GET SIGN UP
router.get("/signup", function(req, res) {
  res.render("signup");
});

// GET LOGIN
router.get("/login", function(req, res) {
  res.render("login", {});
});

// GET RESET
router.get("/reset", function(req, res) {
  res.render("reset");
});

// LOG OUT
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
