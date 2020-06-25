const express = require('express');
const router = express.Router();
const multer = require('multer');

const mainController = require('../controllers/mainController');
const signupController = require('../controllers/signupController');

let videos = multer.diskStorage({
  destination: function(req, file, cb) {
    if(file.mimetype.split("/")[0] === "audio"){
      cb(null, "./audios")
    }
    else if(file.mimetype.split("/")[0] === "video"){
      cb(null, "./videos")
    }
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

let uploadVideos = multer({ storage : videos });

router.route('/signup').post(signupController.signup);

router.route('/trim').post(uploadVideos.any(),mainController.trim);

module.exports = router;