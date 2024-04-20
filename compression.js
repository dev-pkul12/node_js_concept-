const express = require('express');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to compress responses
app.use(compression({
    level: 6, // Compression level (0-9)
    threshold: 512 // Minimum response size (bytes) to compress
}));

// API endpoint
app.get('/api/data', (req, res) => {

    const payload = "This Is Payload Data..."
    // Send response with repeated data
    res.status(200).send(payload.repeat(100000));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
