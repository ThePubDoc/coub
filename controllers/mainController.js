require('dotenv').config();

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const aws = require('aws-sdk');

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

const trim = (req,res) => {
    
    const {videoStart, videoDuration, audioStart, audioDuration} = req.body;
    
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
        
        if(audio.length!==0){
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
                    Key: audio.originalname.split(".")[0]+video.originalname,
                    ACL: 'public-read',
                    Body: fs.createReadStream("./converted/"+audio.originalname.split(".")[0]+video.originalname)
                };      
        
                s3.upload(params , (err,data) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log(data)
                        res.json({"url" : data.Location})
                    }
                })
            })
            .saveToFile("./converted/"+audio.originalname.split(".")[0]+video.originalname)
        }
        else{
            const params = {
                Bucket: "coub",
                Key: req.file.originalname,
                ACL: 'public-read',
                Body: fs.createReadStream("./converted/"+video.originalname)
            };      
    
            s3.upload(params , (err,data) => {
                if(err){
                    console.log(err)
                }
                else{
                    console.log(data)
                    res.json({"url" : data.Location})
                }
            })
        }
        
    })
    .saveToFile("./converted/"+video.originalname)

}

module.exports = {
    index,
    trim,
}