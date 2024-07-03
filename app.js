// app.js

const express = require('express');
const authRoutes = require('./routes/authRoutes');  // Ensure the path is correct

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the authentication routes
app.use('/api/users', authRoutes);

// Define other routes or middleware...
app.get('/', (req, res) => {
    res.send('Homepage');
});

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
