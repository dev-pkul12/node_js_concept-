// app.js
const express = require('express');
const cron = require('node-cron');
const path = require('path'); // Import the path module

const app = express();

// Set up static file serving from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of sample quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Stay hungry, stay foolish. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "The only true wisdom is in knowing you know nothing. - Socrates",
    "Life is what happens when you're busy making other plans. - John Lennon"
];

// Function to generate a random quote
function generateRandomQuote() {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);

    // Get a random quote
    const randomQuote = quotes[randomIndex];

    return randomQuote;
}

// Set up route to get a random quote
app.get('/quote', (req, res) => {
    const randomQuote = generateRandomQuote();
    res.send(randomQuote);
});

// Set up cron job to generate a random quote every 5 seconds
cron.schedule('*/5 * * * * *', () => {
    // console.log(generateRandomQuote());
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
