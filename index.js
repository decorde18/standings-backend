require("dotenv").config(); // Load .env variables

const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

app.use(
  cors({
    origin: "https://standings-decorde.netlify.app/", // Replace with your actual frontend URL
  })
);
app.use(express.json());

const PORT = process.env.DB_PORT || 3000;

app.get("/", (req, res) => {
  res.send("Soccer Standings API is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected");
  }
});

app.get("/teams", (req, res) => {
  db.query("SELECT * FROM Teams", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
