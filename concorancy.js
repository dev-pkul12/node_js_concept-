// Handle Concorancy with any Pacakage
const express = require('express');

let isLocked = false;

const app = express();

// Middleware to acquire lock before processing request
app.use(async (req, res, next) => {
    // Check if the lock is acquired
    if (isLocked) {
        // If locked, wait until the lock is released
        await new Promise(resolve => {
            const checkLock = () => {
                if (!isLocked) {
                    resolve();
                } else {
                    setTimeout(checkLock, 10); // Check again after a short delay
                }
            };
            checkLock();
        });
    }
    // Set the lock
    isLocked = true;
    try {
        // Process request
        next();
    } finally {
        // Release lock
        isLocked = false;
    }
});

// Example shared resource
let sharedResource = 0;

// Route handler to increment the shared resource
app.get('/increment', (req, res) => {
    // Simulate a time-consuming operation
    setTimeout(() => {
        sharedResource++;
        res.send(`Resource incremented to ${sharedResource}`);
    }, 1000); // Simulating a 1-second delay
});

// Route handler to decrement the shared resource
app.get('/decrement', (req, res) => {
    // Simulate a time-consuming operation
    setTimeout(() => {
        sharedResource--;
        res.send(`Resource decremented to ${sharedResource}`);
    }, 1000); // Simulating a 1-second delay
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
