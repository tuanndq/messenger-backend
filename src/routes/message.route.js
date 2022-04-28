const router = require('express').Router();
const messageCtrl = require('../controllers/message.controller');

router.get('/whole/conversation/:conversationId', messageCtrl.getAllInConversation);

router.get('/conversation', messageCtrl.getDefault);

router.get('/:msgId', messageCtrl.getById);

router.get('/filter/conversation', messageCtrl.searchMsg);

router.post('/', messageCtrl.createMsg);

router.patch('/:messageId', messageCtrl.removeMsg);

module.exports = router;
