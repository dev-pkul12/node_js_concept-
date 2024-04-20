// Handling Concurancy with Mutex Package
const express = require('express');
const { Mutex } = require('async-mutex');

const mutex = new Mutex();
let sharedResource = 0; // Example shared resource (could be a database record, file, etc.)

const app = express();

// Middleware to acquire lock before processing request
app.use(async (req, res, next) => {
    const release = await mutex.acquire();
    try {
        // Process request
        next();
    } finally {
        // Release lock
        release();
    }
});

// Route handler to increment the shared resource
app.get('/increment', (req, res) => {
    // Simulate a time-consuming operation
    setTimeout(() => {
        sharedResource++;
        res.send(`Resource incremented to ${sharedResource}`);
    }, 3000); // Simulating a 1-second delay
});

// Route handler to decrement the shared resource
app.get('/decrement', (req, res) => {
    // Simulate a time-consuming operation
    setTimeout(() => {
        sharedResource++;
        res.send(`Resource decremented to ${sharedResource}`);
    }, 3000); // Simulating a 1-second delay
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
