const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");

router.get("/", userCtrl.getUser);

router.post("/", userCtrl.createUser);

router.get("/:id", userCtrl.getUserById);

module.exports = router;
