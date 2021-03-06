const User = require('../models/user');
const Coub = require('../models/coub');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const fs = require('fs');
const { use } = require('../routes/mainRoutes');

aws.config.update({
    secretAccessKey: process.env.AWS_Secret_Access_Key,
    accessKeyId: process.env.AWS_Access_Key_ID,
    region: process.env.region,
});

const s3 = new aws.S3();

const signup = async (req,res) => {
    try {
        const { name, username, password, email } = req.body;
        
        let dp;
        let key;
        if(req.file){
            dp = req.file.buffer;
            key = req.file.originalname;
        }
        else {
            dp = fs.createReadStream("./defaultDP.png");
            key = "default.png";
        }

        const params = {
            Bucket: "coub",
            Key: "dp/"+email+key,
            ACL: 'public-read',
            Body: dp
        };
    
        if( !name || !username || !password || !email){
            res.status(400).json({msg : "Enter all details"});
        }
    
        if(password.length < 6){
            res.status(400).json({msg : "Password must be of at least 6 characters"});
        }
    
        const existingUser = await User.findOne({email : email});
        if(existingUser){
            res.status(400).json({msg : "Email already registered"});
        }
    
        const salt = await bcrypt.genSalt();
        const passswordHash = await bcrypt.hash(password, salt);
    
        s3.upload(params , async (err,data) => {
            if(err){
                console.log(err)
            }
            else{
                const newUser = new User({
                    name,
                    username,
                    email,
                    password : passswordHash,
                    dp : data.Location
                })
                const savedUser = await newUser.save();
                
                res.json(savedUser);
            }
        })
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
}


const login = async (req,res) => {
    try{    
        const { email, password } = req.body;
        
        if( !email || !password){
            res.status(400).json({msg : "Enter all details"})
        }
        
        const user = await User.findOne({email : email});
        if(!user){
            res.status(400).json({msg : "No account found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({msg: "Invalid cridentials"})
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)
        res.json({
            token,
            userData : {
                id : user._id,
                email : user.email,
                name : user.name,
                dp : user.dp,
                username : user.username,
                hearts : user.hearts,
            }
        })
    }
    catch (err){
        res.status(500).json({error : err.message});
    }
}

const isTokenValid = async (req,res) => {
    try{
        let token = req.header("x-auth-token")

        if(!token){
            return res.json(false);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.json(false);
        }

        const user = await User.findById(verified.id);

        if(!user){
            return res.json(false);
        }

        return res.json(true);
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
}

const user = async (req, res) => {
    const loggedUser = await User.findById(req.user);
    res.json({
        id : loggedUser._id,
        username : loggedUser.username,
        name : loggedUser.name,
        email : loggedUser.email,
        dp : loggedUser.dp,
        hearts : user.hearts,
    }) 
}

const getMyCoubs = async (req,res) => {

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page-1)*limit;
    const lastIndex = page*limit;

    const user = await User.findById(req.user);
    const queryResult = {};

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

    const myCoubs = await Coub.find({authorUsername : user.username}).limit(limit).skip(startIndex).exec();
    queryResult.results = myCoubs;
    res.json(queryResult)
}


const getMyLikes = async (req,res) => {
    const user = await User.findById(req.user);

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page-1)*limit;
    const lastIndex = page*limit;

    const likes = user.hearts;
    const requiredCoubs = likes.slice(startIndex,lastIndex);
    
    const queryResult = {};

    const coubs = [];
    for(let i=0;i<requiredCoubs.length;i++){
        let coub = await Coub.findById(requiredCoubs[i])
        coubs.push(coub);
    }

    if(lastIndex < likes.length){
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
    
    queryResult.results = coubs;
    res.json(queryResult);
}


const bookmark = async (req,res) => {
    const user = req.user;
    const {coubId} = req.body;

    const updateUser = await User.findByIdAndUpdate({
        _id : user
    }, {
        $push : {
            bookmarks : coubId
        }
    })

    res.json(true)
}


const getMyBookmarks = async (req,res) => {
    const user = await User.findById(req.user);

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page-1)*limit;
    const lastIndex = page*limit;

    const bookmarks = user.bookmarks;
    const requiredCoubs = bookmarks.slice(startIndex,lastIndex);
    
    const queryResult = {};

    const coubs = [];
    for(let i=0;i<requiredCoubs.length;i++){
        let coub = await Coub.findById(requiredCoubs[i])
        coubs.push(coub);
    }

    if(lastIndex < bookmarks.length){
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
    
    queryResult.results = coubs;
    res.json(queryResult);
}


module.exports = {
    signup,
    login,
    isTokenValid,
    user,
    getMyCoubs,
    getMyLikes,
    bookmark,
    getMyBookmarks,
}