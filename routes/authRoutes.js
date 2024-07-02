const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = new User({ username, password });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).send('Error registering new user');
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('User not found');
        }

        if (password !== user.password) {
            return res.status(400).send('Invalid credentials');
        }

        req.session.user = user; // Save user session
        res.send('User logged in');
    } catch (error) {
        res.status(500).send('Error during login');
    }
});

module.exports = router;
