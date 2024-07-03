// app.js

const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a simple route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
