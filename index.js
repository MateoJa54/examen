const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.get('/', (req, res) => {
    res.send('Integracion continua con Express.js');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});