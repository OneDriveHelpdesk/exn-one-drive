const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Log the credentials to the console
    console.log(`Login attempt - Username: ${username}, Password: ${password}`);

    try {
        // Simulate login logic (not actually checking credentials for this example)
        res.send('Login data recorded');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
