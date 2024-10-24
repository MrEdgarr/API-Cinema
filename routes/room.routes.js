const express = require("express");
const router = express.Router();

const roomsController = require("../controller/room.controller");

router.get("/", roomsController.getAll);

module.exports = router;
