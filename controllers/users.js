const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const Mongoose = require('mongoose');

require("dotenv").config();

module.exports.signUp = async (req, res) => {

    try {
        let user = req.body;

        const existingUser = await User.findOne({ "username": user.username });

        if(existingUser) return res.status(404).json({ 
            description: "User Already Exists !!!"
        });

        user.password = await bcrypt.hash(user.password, 12);

        user = await User.create(user);

        user.password = "";

        res.status(200).json({ content: user, description: 'User profile is created'});

    } catch(error) {
        res.status(500).json({
            description: 'User profile could not be created due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/user/profile',
                message: `Error processing request ${error.message}`
            }
        });
    }

}