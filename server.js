const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

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

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
