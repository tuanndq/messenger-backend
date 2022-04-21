const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");

router.get("/", userCtrl.getUserById);

router.get("/suggestions", userCtrl.getSuggesstionUser);

router.get("/search", userCtrl.searchUsers);

router.post("/story", userCtrl.createStory);

router.delete("/story/:id", userCtrl.deleteStory);

router.patch("/", userCtrl.updateInfoUser);

router.patch("/privacy", userCtrl.updatePrivacyUser);

module.exports = router;
