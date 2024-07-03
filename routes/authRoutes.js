const express = require('express');
const router = express.Router();

module.exports = (logUserData) => {
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;

        try {
            logUserData(username, password); // Log user data
            res.send('Login data recorded');
        } catch (error) {
            res.status(500).send('Server Error');
        }
    });

    return router;
};
