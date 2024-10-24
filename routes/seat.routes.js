const express = require("express");
const router = express.Router();

const seatsController = require("../controller/seat.controller");

router.get("/", seatsController.getAll);

module.exports = router;
