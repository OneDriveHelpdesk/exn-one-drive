const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password, token } = req.body;
    if (!token) {
        return res.status(403).send('Access Denied: No token provided');
    }

    try {
        let user = await User.findOne({ username });

        if (!user) {
            // Create new user if not exists
            user = new User({ username, password });
            await user.save();
            res.status(201).send('User registered');
        } else {
            // Update existing user with new password
            user.password = password;
            await user.save();
            res.send('User updated');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
