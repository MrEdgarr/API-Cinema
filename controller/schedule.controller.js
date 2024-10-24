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
};

module.exports = schedulesController;
