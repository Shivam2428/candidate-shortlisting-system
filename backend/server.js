const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Routes
app.use(
  "/api/candidates",
  require("./routes/candidateRoutes")
);

app.use(
  "/api/match",
  require("./routes/matchRoutes")
);

app.use(
  "/api/ai",
  require("./routes/aiRoutes")
);

// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});