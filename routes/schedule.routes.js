const express = require("express");
const router = express.Router();

const schedulesController = require("../controller/schedule.controller");

router.get("/", schedulesController.getAll);
router.post("/getMovieShowtimes", schedulesController.getMovieShowtimes);

module.exports = router;
