const { Router } = require('express');
const { Authenticator } = require('./authMiddleware');

const memberController = require('../controllers/memberController');

const memberRouter = Router();
const isAuth = new Authenticator();

memberRouter.get(
  '/',
  isAuth.failRedirect('/log-in'),
  memberController.getMember
);

memberRouter.post(
  '/join',
  isAuth.failStatus(401, '401 Unauthorized'),
  memberController.postSecretCode
);

module.exports = memberRouter;
