const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse cookies
app.use(cookieParser());

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('myCookie', 'Hello, world!', { maxAge: 5000, httpOnly: true });
    res.send('Cookie has been set');
});

// Route to get a cookie
app.get('/get-cookie', (req, res) => {
    const myCookie = req.cookies.myCookie;
    if (myCookie) {
        res.send('Cookie value: ' + myCookie);
    } else {
        res.send('Cookie Expired');
    }
});

// Route to delete a cookie
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('myCookie');
    res.send('Cookie has been deleted');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
