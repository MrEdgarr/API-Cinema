const pool = require("../config/database");

const SELECT_SQL =
  "bookings.id, bookings.user_id, " +
  "DATE_FORMAT( CONVERT_TZ(FROM_UNIXTIME(bookings.created_at), @@session.time_zone, '+07:00'), '%H:%i:%s %d/%m/%Y') as created_at," +
  "DATE_FORMAT( CONVERT_TZ(FROM_UNIXTIME(bookings.updated_at), @@session.time_zone, '+07:00'), '%H:%i:%s %d/%m/%Y') as updated_at ";

const bookingsController = {
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query(
        `SELECT ${SELECT_SQL} FROM bookings`
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

module.exports = bookingsController;
