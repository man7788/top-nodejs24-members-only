const { body, validationResult } = require('express-validator');
const passport = require('passport');

const emailErr = 'format is not correct.';
const nameErr = 'must be between 1 and 255 characters.';
const passwordErr = 'must be between 1 and 64 characters.';

const validateUser = [
  body('email')
    .trim()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`Email ${nameErr}`)
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 1, max: 64 })
    .withMessage(`Password ${passwordErr}`)
    .escape(),
];

exports.getIndex = (req, res) => {
  res.render('index', { title: 'Members Only' });
};

exports.postLogin = [
  validateUser,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render('index', { title: 'Members Only', errors: errors.array() });
    }
    next();
  },
  passport.authenticate('local', {
    successRedirect: '/members-only',
    failureRedirect: '/log-in',
  }),
];
