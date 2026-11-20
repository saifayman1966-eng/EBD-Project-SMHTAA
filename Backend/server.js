const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const productsRouter = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 3000;

async function startServer() {
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri) {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB.");
  } else {
    console.warn("MONGODB_URI is not set; /api/products will return 503.");
  }

  app.listen(PORT, () => {
    console.log(`Mysta backend running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the backend:", error.message);
  process.exit(1);
});