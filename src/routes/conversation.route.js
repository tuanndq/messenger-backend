const router = require("express").Router();
const conversationCtrl = require("../controllers/conversation.controller");

router.get("/:userId", conversationCtrl.getDefault);

router.get("/id/:id", conversationCtrl.getById);

router.get("/members/:conversationId", conversationCtrl.getMembers);

router.post("/", conversationCtrl.create);

router.put("/:id", conversationCtrl.update);

module.exports = router;
