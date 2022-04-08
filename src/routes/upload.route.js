const router = require("express").Router();
const multer = require("multer");
const uploadCtrl = require("../controllers/upload.controller");

const upload = multer({
  storage: multer.memoryStorage(),
});

// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, "./images");
//   },
//   filename(req, file, callback) {
//     callback(null, `${Date.now()}.jpg`);
//   },
// });
// const upload = multer({ storage });

router.post("/image", upload.single("image"), uploadCtrl.uploadImage);

router.post("/video", upload.single("video"), uploadCtrl.uploadVideo);

module.exports = router;
