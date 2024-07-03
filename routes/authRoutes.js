const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to store user data
const dataFile = path.join(__dirname, '..', 'data', 'users.txt');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userString = `Username: ${username}, Password: ${password}\n`;

    // Append the user data to the file
    fs.appendFile(dataFile, userString, err => {
        if (err) {
            console.error('Failed to write to file:', err);
            return res.status(500).send('Failed to register user');
        }
        res.send('User data logged');
    });
});

module.exports = router;
