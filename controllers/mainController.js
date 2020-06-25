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
    
    const {start, duration} = req.body;
    
    ffmpeg("./videos/"+req.file.originalname)
    .noAudio()
    .setStartTime(start)
    .duration(duration)
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
            Key: req.file.originalname,
            ACL: 'public-read',
            Body: fs.createReadStream("./converted/"+req.file.originalname)
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
    .saveToFile("./converted/"+req.file.originalname)
}

module.exports = {
    index,
    trim,
}