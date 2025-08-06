const { Router } = require('express');
const indexController = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/members-only');
  } else {
    res.redirect('/log-in');
  }
});

indexRouter.get(
  '/log-in',
  (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/members-only');
    }
    next();
  },
  indexController.getIndex
);
indexRouter.post('/log-in', indexController.postLogin);

module.exports = indexRouter;
