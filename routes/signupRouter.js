const { Router } = require('express');
const signupController = require('../controllers/signupController');

const signupRouter = Router();

signupRouter.get('/', signupController.getSignup);

module.exports = signupRouter;
