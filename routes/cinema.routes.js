const express = require("express");
const router = express.Router();

const cinemasController = require("../controller/cinema.controller");

router.get("/", cinemasController.getAll);

module.exports = router;
