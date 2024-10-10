const express = require("express");
const router = express.Router();

const uploadMulter = require("../middlewares/multer.middlewares");
const bannerController = require("../controller/banner.controller");

// lay tat ca du lieu
router.get("/", bannerController.getAll);

// Them du lieu
const upload = uploadMulter.uploadUlter.fields([
  { name: "img_desktop", maxCount: 1 },
  { name: "img_mobile", maxCount: 1 },
]);
router.post("/create", upload, bannerController.create);

//Cap nhap
router.put("/update/:id", upload, bannerController.update);

// Xoa du lieu
router.delete("/delete/:id", bannerController.delete);
/*
|--------------------------------------------------------------------------
| kiem tra file image
|--------------------------------------------------------------------------
*/
router.use((error, req, res, next) => {
  uploadMulter.checkImg(error, req, res, next);
});

module.exports = router;
