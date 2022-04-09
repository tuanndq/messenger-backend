const router = require('express').Router();
const messageCtrl = require('../controllers/message.controller');

router.get('/:conversationId', messageCtrl.getDefault);

router.post('/', messageCtrl.createMsg);

router.patch('/:messageId', messageCtrl.removeMsg);

module.exports = router;
