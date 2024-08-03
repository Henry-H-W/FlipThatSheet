// Importing the modules for authentication and MongoDB connection
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./auth/authRoutes");
const cors = require("cors");

const pdfDetails = require("./pdfDetails");

const app = express();
const port = process.env.PORT || 8000;

// Setting up the necessary Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// File upload route
app.post("/uploadPDF", async (req, res) => {
  console.log("running server", req);
  const file = req.body.file;

  try {
    console.log("Uploaded file details:", file);
    // await pdfDetails.create({ pdf: file, title: title });
    res.status(201).send("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: error.message });
  }
});

// Routes
app.use("/auth", authRoutes);

// test to see if backend works
app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
