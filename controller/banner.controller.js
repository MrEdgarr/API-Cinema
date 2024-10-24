const pool = require("../config/database");

const bannerController = {
  getAll: async (req, res) => {
    try {
      //  QUERY SQL
      const [rows, fields] = await pool.query(`SELECT * FROM banner`);
      //  STATUS 404
      if (!rows) {
        return res.status(404).send({
          success: false,
          message: "Error in Get All API",
        });
      }
      //  STATUS 200
      res.status(200).send({
        message: "success",
        content: rows,
      });
    } catch (error) {
      console.log(error);
      //  STATUS 500
      res.status(500).send({
        success: false,
        message: "Error in Get All API",
        error: error,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { film_id } = req.body;
      const { img_desktop, img_mobile } = req.files;

      // Kiem tra du lieu nhap vao
      if (!film_id || !img_desktop || !img_mobile) {
        return res.status(500).send({
          success: false,
          message: "Please Provide all fields",
        });
      }
      //  QUERY SQL
      const sql =
        "INSERT INTO `banner`(`film_id`, `img_desktop`, `img_mobile`, `created_at`) VALUES (?,?,?, unix_timestamp(NOW()))";
      const [rows, fields] = await pool.query(sql, [
        film_id,
        img_desktop[0].originalname,
        img_mobile[0].originalname,
      ]);
      if (!rows) {
        return res.status(404).send({
          success: false,
          message: "Error In INSERT QUERY",
          content: rows,
        });
      }
      res.status(201).send({
        success: true,
        message: "Đăng kí thành công",
      });
    } catch (error) {
      console.log(error);
      //  STATUS 500
      res.status(500).send({
        success: false,
        message: "Error in Create API",
        error: error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const { film_id } = req.body;
      const { img_desktop, img_mobile } = req.files;
      const { id } = req.params;

      if (!id) {
        return res.status(404).send({
          success: false,
          message: "Invalid id",
        });
      }
      //  QUERY SQL
      const sql =
        "UPDATE `banner` SET `film_id`=?,`img_desktop`=?, `img_mobile`=?, `updated_at`= unix_timestamp(NOW()) WHERE id = ?";
      const [rows, fields] = await pool.query(sql, [
        film_id,
        img_desktop[0].originalname,
        img_mobile[0].originalname,
        id,
      ]);
      //  STATUS 500
      if (!rows) {
        return res.status(500).send({
          success: false,
          message: "Lỗi trong việc cập nhật dữ liệu",
        });
      }
      //  STATUS 200
      res.status(200).send({
        success: true,
        message: "Cập nhật thành công",
      });
    } catch (error) {
      console.log(error);
      //  STATUS 500
      res.status(500).send({
        success: false,
        message: "Error in Update API",
        error: error,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      // STATUS 404
      if (!id) {
        return res.status(404).send({
          success: false,
          message: "Please Provide Id",
        });
      }
      //  QUERY SQL
      const [rows, fields] = await pool.query(
        "DELETE FROM `banner` WHERE id =  ?",
        [id]
      );
      //  STATUS 200
      res.status(200).send({
        success: true,
        message: "Đã xóa thành công",
      });
    } catch (error) {
      console.log(error);
      //  STATUS 500
      res.status(500).send({
        success: false,
        message: "Error in Delete API",
        error: error,
      });
    }
  },
};

module.exports = bannerController;
