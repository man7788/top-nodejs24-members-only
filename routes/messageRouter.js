const { Router } = require('express');
const { Authenticator } = require('./authMiddleware');

const messageController = require('../controllers/messageController');

const messageRouter = Router();
const isAuth = new Authenticator();

messageRouter.post(
  '/',
  isAuth.failStatus(401, '401 Unauthorized'),
  messageController.postMessage
);

messageRouter.post(
  '/:id/delete',
  isAuth.failStatus(401, '401 Unauthorized'),
  messageController.deleteMessage
);

module.exports = messageRouter;
