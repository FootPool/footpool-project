const pgp = require("pg-promise")();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
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

app.get("/", function(req, res) {
  res.render("reset");
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
