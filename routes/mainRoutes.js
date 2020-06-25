const express = require('express');
const router = express.Router();
const multer = require('multer');

const mainController = require('../controllers/mainController');
const signupController = require('../controllers/signupController');

var videos = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./videos");
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
let upload = multer({ storage : videos });

router.route('/signup').post(signupController.signup);
router.route('/trim').post(upload.single("file"),mainController.trim);

module.exports = router;