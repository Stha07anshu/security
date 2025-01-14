const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sanitize = require('sanitize-filename');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(helmet());

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const sanitizedFilename = sanitize(file.originalname);
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many upload requests, please try again later.',
});

// Route
app.post('/upload', uploadLimiter, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Invalid file type. Please upload a .jpg or .png image.');
  }

  const isValid = await validateFileContent(req.file.path);
  if (!isValid) {
    fs.unlinkSync(req.file.path); // Delete invalid file
    return res.status(400).send('Uploaded file is not a valid image.');
  }

  res.status(200).send({ message: 'File uploaded successfully!', file: req.file });
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
