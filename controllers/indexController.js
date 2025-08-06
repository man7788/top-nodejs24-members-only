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
  const messages = req.flash('error');
  const errors = [];
  if (messages) {
    messages.forEach((message) => {
      errors.push({ msg: message });
    });
  }
  res.render('index', { title: 'Members Only', errors });
};

exports.postLogin = [
  validateUser,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res
        .status(400)
        .render('index', { title: 'Members Only', errors: errors.array() });
    }
    next();
  },
  passport.authenticate('local', {
    successRedirect: '/members-only',
    failureRedirect: '/log-in',
    failureFlash: true,
  }),
];

exports.getLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
