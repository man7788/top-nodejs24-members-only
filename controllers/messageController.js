const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const messageErr = 'must be between 1 and 1000 characters.';

const validateUser = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 1024 })
    .withMessage(`Message ${messageErr}`)
    .escape(),
];

exports.postMessage = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash('messages', errors.array());
      return res.redirect('/members-only');
    }

    await db.createMessage(req.session.passport.user, req.body.message);
    res.redirect('/members-only');
  },
];

exports.deleteMessage = async (req, res, next) => {
  await db.deleteMessage(req.body.delete);
  res.redirect('/members-only');
};
