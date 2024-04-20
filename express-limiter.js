const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

let data = [
  {
    id: 1,
    name: "Product A",
    price: 20.99,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Product B",
    price: 15.49,
    category: "Clothing",
  },
  {
    id: 3,
    name: "Product C",
    price: 9.99,
    category: "Home & Kitchen",
  },
];

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api/", limiter); // Apply rate limiter to /api/ route

// Define your API route
app.get("/api/data", (req, res) => {
  res.send(`Your API data here : ${data}`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
