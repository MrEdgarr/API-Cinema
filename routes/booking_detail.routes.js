const express = require("express");
const router = express.Router();

const bookings_detailController = require("../controller/booking_detail.controller");

router.get("/", bookings_detailController.getAll);

module.exports = router;
