const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");

// router.get('/admin', userCtrl.getAll);
router.get("/search", userCtrl.searchUsers);

router.get("/", userCtrl.getUsers);

router.get("/:id", userCtrl.getUserById);

router.post("/story", userCtrl.createStory);

router.delete("/story/:id", userCtrl.deleteStory);

router.patch("/", userCtrl.updateInfoUser);

router.patch("/privacy", userCtrl.updatePrivacyUser);

module.exports = router;
