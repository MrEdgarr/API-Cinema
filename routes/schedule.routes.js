const express = require("express");
const router = express.Router();

const schedulesController = require("../controller/schedule.controller");

router.get("/", schedulesController.getAll);

module.exports = router;
