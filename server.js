const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("Backend root is working!");
});

// API route
app.get("/api/", (req, res) => {
  res.send("Backend API is working!");
});

app.listen(5000, () => console.log("Server running on port 5000"));