const User = require('../models/user');

const signup = async (req,res) => {
    const { name, username, password, email } = req.body;
    const newUser = new User(req.body)
    const userSave = await newUser.save();
    const loggedInUser = {}
}

module.exports = {
    signup,
}