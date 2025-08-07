const { Router } = require('express');

const memberController = require('../controllers/memberController');

const memberRouter = Router();

memberRouter.get(
  '/',
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/log-in');
    }
  },
  memberController.getMember
);

memberRouter.post('/join', memberController.postSecretCode);

module.exports = memberRouter;
