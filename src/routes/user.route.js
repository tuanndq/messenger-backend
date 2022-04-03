const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");

router.get("/", userCtrl.getUserById);

router.patch("/", userCtrl.updateInfoUser);

router.patch("/privacy", userCtrl.updatePrivacyUser);

module.exports = router;
