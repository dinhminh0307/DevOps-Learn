const express = require("express");

const app = express();

// Read port from environment variable (VERY IMPORTANT for cloud)
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Node.js backend is running!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.get("/api/time", (req, res) => {
  res.json({
    serverTime: new Date().toISOString(),
  });
});

app.get("/api/greeting", (req, res) => {
  res.json({
    serverTime: 'Hello World',
  });
});

app.get("/db-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ dbTime: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
