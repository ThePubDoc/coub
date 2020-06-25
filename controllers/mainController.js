const ffmpeg = require('fluent-ffmpeg');

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
    
    ffmpeg("./videos/"+req.file.originalname)
    .noAudio()
    .setStartTime('00:02:00')
    .duration(10)
    .on("start", function(commandLine) {
        console.log("Spawned FFmpeg with command: " + commandLine);
    })
    .on('error', function(err, stdout, stderr) {
        console.log('Cannot process video: ' + err.message);
    })
    .on('end', function(stdout, stderr) {
        console.log('Transcoding succeeded !');
    })
    .saveToFile("./converted/"+req.file.originalname)
}

module.exports = {
    index,
    trim,
}