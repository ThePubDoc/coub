const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const signupController = require('../controllers/signupController');

router.route('/signup').post(signupController.signup);

module.exports = router;