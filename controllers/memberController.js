const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const codeErr = 'must be between 1 and 64 characters.';

const validateSecret = [
  body('passcode')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Secret code ${codeErr}`)
    .escape(),
];

exports.getMember = (req, res) => {
  res.locals.errors = req.flash('messages');
  res.render('member', { title: 'Welcome to Members Only' });
};

exports.postSecretCode = [
  validateSecret,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('member', {
        title: 'Welcome to Members Only',
        errors: errors.array(),
      });
    }

    const result = await db.readSecretCode();

    if (result[0].secret_code !== req.body.passcode) {
      return res.render('member', {
        title: 'Welcome to Members Only',
        errors: [{ msg: 'Secret passcode is invalid' }],
      });
    }

    await db.updateUserById(req.session.passport.user);

    res.redirect('/members-only');
  },
];
