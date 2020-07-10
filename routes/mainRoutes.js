const express = require('express');
const router = express.Router();
const multer = require('multer');

const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');

const auth = require('../controllers/middlewares/auth');

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

let dp = multer.memoryStorage();
let uploadDP = multer({ storage : dp });

//user 
router.route('/signup').post(uploadDP.single("dp"), userController.signup);
router.route('/login').post(userController.login);
router.route('/isTokenValid').post(userController.isTokenValid);

router.route('/user').get(auth, userController.user);
router.route('/getMyCoubs').get(auth, userController.getMyCoubs);


router.route('/trim').post(auth, uploadVideos.any(),mainController.trim);
router.route('/getOtherUserInfo').post(mainController.getOtherUserInfo);

router.route('/getAllCoubs').get(mainController.getAllCoubs);
router.route('/getUserAllCoubs').get(mainController.getUserAllCoubs);
router.route('/getCoubDetails').get(mainController.getCoubDetails);

router.route('/like').post(auth, mainController.likeCoub);
router.route('/dislike').post(auth, mainController.dislikeCoub);

router.route('/myLikes').get(auth, userController.getMyLikes);
router.route('/bookmark').post(auth, userController.bookmark);
router.route('/myBookmarks').get(auth, userController.getMyBookmarks);

module.exports = router;