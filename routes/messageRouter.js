const { Router } = require('express');
const messageController = require('../controllers/messageController');

const messageRouter = Router();

messageRouter.post('/', messageController.postMessage);

module.exports = messageRouter;
