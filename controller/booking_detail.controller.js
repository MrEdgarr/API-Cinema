const pool = require("../config/database");

const booking_detailController = {
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("SELECT * FROM booking_detail");

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

module.exports = booking_detailController;
