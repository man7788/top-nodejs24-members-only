const db = require('../db/queries');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const nameErr = 'must be between 1 and 255 characters.';
const emailErr = 'format is not correct.';
const passwordErr = 'must be between 1 and 64 characters.';
const confirmErr = 'do not match.';

const validateUser = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`First Name ${nameErr}`)
    .escape(),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Last Name ${nameErr}`)
    .escape(),
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
  body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords ${confirmErr}`)
    .escape(),
];

exports.getSignup = (req, res) => {
  res.render('signup', { title: 'Sign Up' });
};

exports.postSignup = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render('signup', { title: 'Sign Up', errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword
    );

    res.redirect(`/members-only`);
  },
];
