const path = require('path');
require('dotenv').config({path : path.resolve(__dirname, '../.env')});
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const aws = require('aws-sdk');

const User = require('../models/user');
const Coub = require('../models/coub');
const coub = require('../models/coub');

aws.config.update({
    secretAccessKey: process.env.AWS_Secret_Access_Key,
    accessKeyId: process.env.AWS_Access_Key_ID,
    region: process.env.region,
});

const s3 = new aws.S3();

const index = (req,res) => {
    res.json({msg : "Hello"});
}

// extract frames from video
const extractAllFrames = async (req,res) => {
    // console.log(req.files)
    try {
        var process = new ffmpeg("controllers/test.mp4");
        process.then(function (video) {
            video.fnExtractFrameToJPG("frames/", {
                frame_rate : 60
            })
        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
}

const trim = async (req,res) => {
    
    const userId = req.user;
    const userData = await User.findById(userId);

    const {videoStart, videoDuration, audioStart, audioDuration, caption} = req.body;
    let tags = req.body.tags.split(','); 
    let video = "";
    let audio = "";
    
    if(req.file){
        video = req.file;
    }
    else if(req.files){
        video = req.files[0];
        audio = req.files[1];
    }

    console.log(req.files)

    ffmpeg("./videos/"+video.originalname)
    .noAudio()
    .setStartTime(videoStart)
    .duration(videoDuration)
    .on("start", function(commandLine) {
        console.log("Spawned FFmpeg with command: " + commandLine);
    })
    .on('error', function(err, stdout, stderr) {
        console.log('Cannot process video: ' + err.message);
    })
    .on('end', function(stdout, stderr) {
        console.log('Transcoding succeeded !');
        
        if(audio){
            ffmpeg("./converted/"+video.originalname)
            .inputOption('-stream_loop -1')
            .mergeAdd("./audios/"+ audio.originalname)
            .setStartTime(audioStart)
            .duration(audioDuration)
            .on("start", function(commandLine) {
                console.log("Spawned FFmpeg with command: " + commandLine);
            })
            .on('error', function(err, stdout, stderr) {
                console.log('Cannot process video: ' + err.message);
            })
            .on('end', function(stdout, stderr) {
                console.log('Transcoding succeeded !');
                const params = {
                    Bucket: "coub",
                    Key: "coubs/"+audio.originalname.split(".")[0]+video.originalname,
                    ACL: 'public-read',
                    Body: fs.createReadStream("./converted/"+audio.originalname.split(".")[0]+video.originalname)
                };      
        
                s3.upload(params , async (err,data) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log(data)
                        const coubData = new Coub({
                            url : data.Location,
                            caption,
                            tags,
                            authorUsername : userData.username,
                            author : userData.name
                        })

                        await coubData.save();

                        const updateUser = await User.findOneAndUpdate({
                            _id : userData._id
                        }, {
                            $push : { coubs : coubData._id }
                        });
                        
                        res.json({"url" : data.Location})
                    }
                })

                
                fs.unlink("./converted/"+audio.originalname.split(".")[0]+video.originalname,(err)=>{
                    if(err){
                        console.log(err)
                    }
                });
                fs.unlink("./converted/"+video.originalname,(err)=>{
                    if(err){
                        console.log(err)
                    }
                });
                fs.unlink("./videos/"+video.originalname,(err)=>{
                    if(err){
                        console.log(err)
                    }
                })
                fs.unlink("./audios/"+audio.originalname,(err)=>{
                    if(err){
                        console.log(err)
                    }
                })
            })
            .saveToFile("./converted/"+audio.originalname.split(".")[0]+video.originalname)
        }
        else{
            const params = {
                Bucket: "coub",
                Key: "coubs/"+video.originalname,
                ACL: 'public-read',
                Body: fs.createReadStream("./converted/"+video.originalname)
            };      
    
            s3.upload(params , async (err,data) => {
                if(err){
                    console.log(err)
                }
                else{
                    console.log(data)
                    const coubData = new Coub({
                        url : data.Location,
                        caption,
                        tags,
                        authorUsername : userData.username,
                        author : userData.name
                    })

                    await coubData.save();

                    const updateUser = await User.findOneAndUpdate({
                        _id : userData._id
                    }, {
                        $push : { coubs : coubData._id }
                    });
                    res.json({"url" : data.Location})
                }
            })
            fs.unlink("./converted/"+video.originalname,(err)=>{
                if(err){
                    console.log(err)
                }
            })
            fs.unlink("./videos/"+video.originalname,(err)=>{
                if(err){
                    console.log(err)
                }
            })
        }
        
    })
    .saveToFile("./converted/"+video.originalname)

}

const getOtherUserInfo = async (req,res) => {
    const user = await User.findOne({username : req.body.username});
    if(!user) {
        return res.status(404).json({msg : "No user found"});
    }
    res.json({
        otherUserInfo : {
            name : user.name,
            username : user.username,
            email : user.email,
            dp : user.dp,
        }
    })
}

const getAllCoubs = async (req,res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page-1)*limit;
    const lastIndex = page*limit;

    const queryResult = {};
    if(lastIndex < await Coub.countDocuments().exec()){
        queryResult.next = {
            page : page + 1,
            limit : limit,
        }
    }

    if( startIndex > 0) {
        queryResult.previous = {
            page : page -1,
            limit : limit,
        }
    }

    const coubs = await Coub.find().limit(limit).skip(startIndex).exec();
    queryResult.results = coubs;
    res.json(queryResult)
}

const getUserAllCoubs = async (req,res) => {

    const username = req.query.username;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page-1)*limit;
    const lastIndex = page*limit;

    const queryResult = {};

    const user = await User.findOne({username : username});

    if(lastIndex < user.coubs.length){
        queryResult.next = {
            page : page + 1,
            limit : limit,
        }
    }

    if( startIndex > 0) {
        queryResult.previous = {
            page : page -1,
            limit : limit,
        }
    }

    const coubs = await Coub.find({authorUsername : username}).limit(limit).skip(startIndex).exec();
    queryResult.results = coubs;
    console.log(coubs)
    res.json(queryResult)
}

const getCoubDetails = async (req,res) => {
    const id = req.query.coubid;

    const coubDetails = await Coub.findOne({_id : id});

    const user = await User.findOne({username : coubDetails.authorUsername});

    const userDetails = {
        name : user.name,
        username : user.username,
        dp : user.dp
    }

    res.json({
        coubDetails,
        userDetails
    });
}


const likeCoub = async (req,res) => {
    
    const { coubId } = req.body;
    const coubDetails = await Coub.findById(coubId);
    const hearts = coubDetails.hearts;
    
    const updateCoub = await Coub.findByIdAndUpdate({
        _id : coubId
    }, {
        $push : { likedBy : req.user },
        hearts : hearts+1,
    });

    const updateUser = await User.findByIdAndUpdate({
        _id : req.user
    }, {
        $push : { hearts : coubId }
    });
    
    res.json(true)
}

const dislikeCoub = async (req,res) => {
    const { coubId } = req.body;
    const coubDetails = await Coub.findById(coubId);
    const hearts = coubDetails.hearts;
    
    const updateCoub = await Coub.findByIdAndUpdate({
        _id : coubId
    }, {
        $pull : { likedBy : req.user },
        hearts : hearts-1,
    });

    const updateUser = await User.findByIdAndUpdate({
        _id : req.user
    }, {
        $pull : { hearts : coubId }
    });
    
    res.json(false)
}


module.exports = {
    index,
    trim,
    getOtherUserInfo,
    getAllCoubs,
    getUserAllCoubs,
    getCoubDetails,
    likeCoub,
    dislikeCoub,
}