const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API Routes
app.use('/api/users', authRoutes);

// Define a simple route
app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
