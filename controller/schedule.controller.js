const pool = require("../config/database");

const SELECT_SQL =
    "schedules.id, schedules.movie_id, schedules.room_id, " +
    "DATE_FORMAT( CONVERT_TZ(FROM_UNIXTIME(schedules.start_time), @@session.time_zone, '+07:00'), '%H:%i:%s %d/%m/%Y') as start_time," +
    "DATE_FORMAT( CONVERT_TZ(FROM_UNIXTIME(schedules.end_time), @@session.time_zone, '+07:00'), '%H:%i:%s %d/%m/%Y') as end_time ";

const schedulesController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(
                `SELECT ${SELECT_SQL} FROM schedules`
            );
            res.status(200).send({
                success: true,
                content: rows,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Errors in Get All API",
            });
        }
    },
    getMovieShowtimes: async (req, res) => {
        const { city_id, cinema_id, movie_id, date_schedule } = req.body;

        try {
            const [rows, fields] = await pool.query(
                `SELECT tb3.cityId, tb3.city_name, ( JSON_ARRAYAGG( JSON_OBJECT( 'cinema_id', tb3.cinemaId, 'cinema_name', tb3.cinema_name, 'cinema_address', tb3.cinema_address, 'cinema_img', tb3.cinema_img, 'movies', tb3.resultMovies ) ) ) resultCinemas FROM ( SELECT tb2.cinemaId, tb2.cinema_name, tb2.cinema_img, tb2.cinema_address, tb2.cityId, tb2.city_name, ( JSON_ARRAYAGG( JSON_OBJECT( 'movie_id', tb2.movieId, 'name', tb2.name, 'poster', tb2.poster, 'genres', tb2.genres, 'cens', tb2.cens, 'schedules', tb2.resultSchedules ) ) ) resultMovies FROM ( SELECT tb1.movieId, tb1.name, tb1.poster, tb1.genres, tb1.cens, tb1.cinemaId, tb1.cinema_name, tb1.cinema_img, tb1.cinema_address, tb1.cityId, tb1.city_name, ( JSON_ARRAYAGG( JSON_OBJECT( 'schedule_id', tb1.schedulesId, 'start_time', tb1.start_time, 'movie_id', tb1.movieId, 'room_id', tb1.roomId, 'end_time', tb1.end_time ) ) ) resultSchedules FROM ( SELECT schedules.id AS schedulesId, schedules.movie_id AS movieId, schedules.room_id AS roomId, schedules.start_time, schedules.end_time, films.name, films.poster, films.genres, films.cens, cinemas.id AS cinemaId, cinemas.cinema_name, cinemas.cinema_img, cinemas.cinema_address, citys.id AS cityId, citys.city_name FROM schedules INNER JOIN rooms ON rooms.id = schedules.room_id INNER JOIN films ON schedules.movie_id = films.id INNER JOIN cinemas ON cinemas.id = rooms.cinema_id INNER JOIN citys ON citys.id = cinemas.city_id WHERE ${
                    date_schedule
                        ? `DATE_FORMAT( CONVERT_TZ(FROM_UNIXTIME(schedules.start_time), @@session.time_zone, '+07:00'), '%d/%m') = ?`
                        : ``
                }  
                ${city_id ? `AND citys.id = ${city_id}` : ``} 
                ${cinema_id ? `AND cinemas.id = ${cinema_id}` : ""}
                ${movie_id ? `AND films.id = ${movie_id}` : ``} 
                ) tb1 GROUP BY tb1.movieId, tb1.cinemaId ) tb2 GROUP BY tb2.cinemaId, tb2.cityId ) tb3 GROUP BY tb3.cityId;`,
                [date_schedule]
            );

            res.status(200).send({
                success: true,
                content: rows,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Errors in Get All API",
            });
        }
    },
};

module.exports = schedulesController;
