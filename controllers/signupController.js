const User = require('../models/user');
const bcrypt = require('bcryptjs');

const signup = async (req,res) => {
    try {
        const { name, username, password, email } = req.body;
    
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
    
        const newUser = new User({
            name,
            username,
            email,
            password : passswordHash,
        })
        const savedUser = await newUser.save();
        
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
}

module.exports = {
    signup,
}