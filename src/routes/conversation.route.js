const router = require('express').Router();
const conversationCtrl = require('../controllers/conversation.controller');

router.get('/:id', conversationCtrl.getById);

router.get('/:userId', conversationCtrl.getDefault);

router.post('/', conversationCtrl.create);

router.put('/:id', conversationCtrl.update);

module.exports = router;
