const express = require('express');
const app = express();
const axios = require("axios")

// Route to get client IP
app.get('/get-ip', async (req, res) => {
    const ip = await axios.get('https://api.ipify.org');

    console.log(ip)
    const data = JSON.stringify(ip);
    res.status(200).json(data)
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});