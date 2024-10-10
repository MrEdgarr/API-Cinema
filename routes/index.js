var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
  // res.setHeader("Content-type", "text/html");
  // res.write(
  //   "<div style='text-align: center;display: grid;place-items: center;height: 100%;'><div><h1>Express</h1><h3>Welcome to express</h3></div></div>"
  // );
  // res.end();
});

module.exports = router;
