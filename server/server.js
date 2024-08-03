// Importing the modules for authentication and MongoDB connection
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./auth/authRoutes');
const cors = require('cors');

// Importing the modules for uploading PDF files 
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Setting up the necessary Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Setting up the storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
})

require('./pdfDetails')
const pdfSchema = mongoose.model('pdfDetails')
const upload = multer({ storage: storage })
s
// File upload route
app.post("/upload-files",upload.single("file"), async (req, res) => {
  // Access file information from req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const title = req.body.title
  const fileName = req.file.filename
  console.log('Uploaded File:', req.file); // Debugging log
  
  try {
    await pdfSchema.create({title: title, pdf: fileName})
    res.send({ message: 'File uploaded successfully' });
  } catch (error) {
    res.json({ message: error.message });
  }
})

// Routes
app.use('/auth', authRoutes);

// test to see if backend works
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



