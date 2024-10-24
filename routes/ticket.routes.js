const express = require("express");
const router = express.Router();

const ticketsController = require("../controller/ticket.controller");

router.get("/", ticketsController.getAll);

module.exports = router;
