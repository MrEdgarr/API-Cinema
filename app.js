var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//.env
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/auth.routes");
var bannerRouter = require("./routes/banner.routes");
var filmRouter = require("./routes/film.routes");
var bookingsRouter = require("./routes/booking.routes");
var booking_detailRouter = require("./routes/booking_detail.routes");

var scheduleRouter = require("./routes/schedule.routes");

var ticketRouter = require("./routes/ticket.routes");

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

/*
|--------------------------------------------------------------------------
| Api Routes
|--------------------------------------------------------------------------
| Here is where you can register API routes for your application.
*/
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/banner", bannerRouter);
app.use("/movies", filmRouter);
app.use("/bookings", bookingsRouter);
app.use("/booking_detail", booking_detailRouter);
app.use("/schedules", scheduleRouter);
app.use("/tickets", ticketRouter);

// Tao duong dan cho image
app.use("/images", express.static("public\\image\\"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
