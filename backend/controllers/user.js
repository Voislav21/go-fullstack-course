// User related bussiness logic //

// Import bcrypt package //
const bcrypt = require('bcrypt');

// Import JSON Web Token //
const jwt = require('jsonwebtoken');

// Import user model //
const User = require('../models/user');

// Sign Up function //
exports.signup = (reg, res, next) => {
    // call hash function to hash the password //
    bcrypt.hash(reg.body.password, 10)
    // returns promise which recieves the hash //
    .then((hash) => {
        //create new user using our user model //
        const user = new User({
            email: reg.body.email,
            password: hash
        });
        // save this to the database //
        user.save()
        .then(() => {
            res.status(201).json({
                message: 'User added successfully!'
            });
        }).catch((error) => {
            res.status(500).json({
                error: error
            });
        });
    });
};

// Login function //
exports.login = (reg, res ,next) => {
    // Check if user exists by looking in the database //
    // Input matching an email in the request.body.email //
    User.findOne({ email: reg.body.email })
    // Return a promise containing the user //
    .then((user) => {
        // Check if we dont get a user back from the database //
        if (!user) {
            // 401 status autentication error //
            return res.status(401).json({
                error: new Error('User not found!')
            });
        }
        // If user exists compare the entered password with the hash in the database //
        bcrypt.compare(reg.body.password, user.password)
        // returns a promise that recieves whether it is valid //
        .then((valid) => {
            // Check if it is not valid //
            if (!valid) {
                // 401 status authentication error //
                return res.status(401).json({
                    error: new Error('Incorrect password!')
                });
            }
            
            // Creat token varible to encode our data using the sign method which takes two arguments //
            const token = jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                // Configuration object //
                { expiresIn: '24h' });
            // Successfully user found with valid password //
            res.status(200).json({
                // send back to frontend excepts a json object with two fields //
                userId: user._id,
                token: token
            });
        }).catch((error) => {
            res.status(500).json({
                error: error
            });
        });
    }).catch((error) => {
        res.status(500).json({
            error: error
        });
    });
};