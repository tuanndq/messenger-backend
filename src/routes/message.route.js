const router = require('express').Router();
const messageCtrl = require('../controllers/message.controller');

router.get('/conversation/whole/:conversationId', messageCtrl.getAllInConversation);

router.get('/conversation/:conversationId', messageCtrl.getDefault);

router.get('/:msgId', messageCtrl.getById);

router.post('/', messageCtrl.createMsg);

router.patch('/:messageId', messageCtrl.removeMsg);

module.exports = router;
