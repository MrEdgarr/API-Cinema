const express = require("express");
const router = express.Router();

const bookingsController = require("../controller/booking.controller");

router.get("/", bookingsController.getAll);

module.exports = router;
