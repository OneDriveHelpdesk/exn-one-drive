const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');

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

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/exn1';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// API Routes
app.use('/api/users', authRoutes);

// Define a simple route
app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
