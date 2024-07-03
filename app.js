const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON

const authRoutes = require('./routes/authRoutes');
app.use('/api/users', authRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
