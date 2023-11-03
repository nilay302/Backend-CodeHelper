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

module.exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        // console.log(user);

        if(!user) {
            return res.status(404).json({
                description: "User Does Not Exist !!!",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile/login',
                    message: 'User does not exist'
                }
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(404).json({
                description: "Invalid Credentials !!!",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile/login',
                    message: 'Invalid credentials'
                }
            });
        }

        res.status(200).json({ content: user, description: 'Logged in Successfully'});

    } catch (error) {
        res.status(500).json({
            description: 'User could not be logged in due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/user/profile/login',
                message: `Error processing request ${error.message}`
            }
        });
    }

};