const { Router } = require('express');
const { Authenticator } = require('./authMiddleware');

const indexController = require('../controllers/indexController');

const indexRouter = Router();
const isAuth = new Authenticator();

indexRouter.get(
  '/',
  isAuth.failRedirect('/log-in'),
  isAuth.redirect('/members-only')
);

indexRouter.get(
  '/log-in',
  isAuth.redirect('members-only'),
  indexController.getIndex
);

indexRouter.post('/log-in', indexController.postLogin);

indexRouter.get('/log-out', indexController.getLogout);

module.exports = indexRouter;
