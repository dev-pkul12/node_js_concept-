// app.js
const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const app = express();

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Cron job demo');
});

// Set up cron job to send email reminder every day at 9:00 AM
cron.schedule('0 9 * * *', () => {
  sendReminderEmail();
}, {
  scheduled: true,
  timezone: "Asia/Kolkata" // Set your timezone here
});

// Function to send reminder email
function sendReminderEmail() {
  // Set up nodemailer transporter (replace with your SMTP settings)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-password' // Replace with your password
    }
  });

  // Set up email data
  let mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: 'recipient@example.com', // Replace with recipient email
    subject: 'Daily Reminder',
    text: 'Don\'t forget to complete your tasks today!'
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred while sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
