const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    console.log("Received login request with data:", req.body);
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            console.log("No existing user, creating new user.");
            user = new User({ username, password });
            await user.save();
            res.status(201).send('User registered');
        } else {
            console.log("User exists, updating password.");
            user.password = password;
            await user.save();
            res.send('User updated');
        }
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
