const express = require("express");
const shortid = require("shortid");

const app = express();

// In-memory storage array for URLs
const urls = [];

// Middleware to parse JSON bodies
app.use(express.json());

// Route to create short URL
app.post("/api/shorten", (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();
  urls.push({ originalUrl, shortUrl });
  res.json({ shortUrl });
});

// Route to redirect short URL to original URL
app.get("/:shortUrl", (req, res) => {
  const url = urls.find((u) => u.shortUrl === req.params.shortUrl);
  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
