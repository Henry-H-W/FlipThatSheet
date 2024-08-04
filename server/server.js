// Importing the modules for authentication and MongoDB connection
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

// Making the folder accessible everywhere
app.use("/files", express.static("files"));

// Setting up the necessary Middleware
app.use(express.json());
app.use(cors());

// Installing multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

require("./pdfDetails");
const pdfSchema = mongoose.model("pdfDetails");
const upload = multer({ storage: storage });

// Creating the api
app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;

  try {
    await pdfSchema.create({
      title: title,
      pdf: fileName,
    });
    res.send({ message: "File uploaded successfully" });
  } catch (error) {
    res.json({ message: error });
  }
});

// Test to see if backend works
app.get("/", async (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Getting the files from mongoDB globally
app.get("/get-files", async (req, res) => {
  try {
    pdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});
// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
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
