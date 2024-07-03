const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Session middleware
app.use(session({
    secret: 'your secret key',
    resave: true,
    saveUninitialized: true
}));

// Check if the data directory exists; if not, create it
const dataPath = path.join(__dirname, 'data');
if (!fs.existsSync(dataPath)){
    fs.mkdirSync(dataPath, { recursive: true });
}

// API Routes
app.use('/api/users', authRoutes);

// Define a simple route
app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
