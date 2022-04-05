const router = require("express").Router();
const multer = require("multer");
const uploadCtrl = require("../controllers/upload.controller");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/image", upload.single("image"), uploadCtrl.uploadImage);

router.post("/video", upload.single("video"), uploadCtrl.uploadVideo);

module.exports = router;
